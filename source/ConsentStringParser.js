import { convertBitstringToInteger, convertByteToBitstring, decodeBase64ToArrayBuffer } from "./decode.js";
import VendorRangeEntry from "./VendorRangeEntry.js";

const CMP_ID_OFFSET = 78;
const CMP_ID_SIZE = 12;
const CMP_VERSION_OFFSET = 90;
const CMP_VERSION_SIZE = 12;
const DEFAULT_CONSENT_OFFSET = 173;
const ENCODING_TYPE_OFFSET = 172;
const ENCODING_TYPE_SIZE = 1;
const NUM_ENTRIES_OFFSET = 174;
const NUM_ENTRIES_SIZE = 12;
const PURPOSES_OFFSET = 132;
const PURPOSES_SIZE = 24;
const RANGE_ENTRY_OFFSET = 186;
const VENDOR_BITFIELD_OFFSET = 173;
const VENDOR_ENCODING_RANGE = 1;
const VENDOR_ID_SIZE = 16;
const VERSION_BIT_OFFSET = 0;
const VERSION_BIT_SIZE = 6;

/**
 * Parser instance for processing IAB consent strings
 * @class ConsentStringParser
 */
export default class ConsentStringParser {
    /**
     * Constructor for the parser
     * @param {String} consentString The consent string
     * @throws {Error} Throws for invalid consent strings
     * @memberof ConsentStringParser
     */
    constructor(consentString) {
        if (!consentString) {
            throw new Error("Invalid consent string value");
        }
        this.consentString = consentString;
        const buff = decodeBase64ToArrayBuffer(consentString);
        this.consentData = buff.reduce((binStr, nextByte) => {
            return `${binStr}${convertByteToBitstring(nextByte)}`;
        }, "");
        this._processPurposes();
        if (this.vendorEncodingType === VENDOR_ENCODING_RANGE) {
            this._processVendorsList();
        }
    }

    /**
     * CMP ID
     * @type {Number}
     * @memberof ConsentStringParser
     * @readonly
     */
    get cmpID() {
        return this._getInt(CMP_ID_OFFSET, CMP_ID_SIZE);
    }

    /**
     * CMP version
     * @type {Number}
     * @memberof ConsentStringParser
     * @readonly
     */
    get cmpVersion() {
        return this._getInt(CMP_VERSION_OFFSET, CMP_VERSION_SIZE);
    }

    /**
     * The encoding type used for the vendor(s) list
     * @type {Number}
     * @memberof ConsentStringParser
     * @readonly
     */
    get vendorEncodingType() {
        return this._getInt(ENCODING_TYPE_OFFSET, ENCODING_TYPE_SIZE);
    }

    /**
     * The consent string version used by the CMP
     * @type {Number}
     * @memberof ConsentStringParser
     * @readonly
     */
    get version() {
        return this._getInt(VERSION_BIT_OFFSET, VERSION_BIT_SIZE);
    }

    /**
     * Check if a purpose is allowed
     * @param {Number} purposeID The ID of the purpose to check
     * @returns {Boolean} True if the purpose is allowed, false otherwise
     * @memberof ConsentStringParser
     */
    purposeAllowed(purposeID) {
        if (purposeID < 1 || purposeID > this.allowedPurposes.length) {
            return false;
        }
        return Boolean(this.allowedPurposes[purposeID - 1]);
    }

    /**
     * Check if a vendor is allowed
     * @param {Number} vendorID The ID of the vendor to check
     * @returns {Boolean} True if the vendor is allowed, false otherwise
     * @memberof ConsentStringParser
     */
    vendorAllowed(vendorID) {
        if (this.vendorEncodingType === VENDOR_ENCODING_RANGE) {
            const present = this._vendorInRange(vendorID);
            return present !== Boolean(this.defaultConsent);
        }
        try {
            return Boolean(this._getBit(VENDOR_BITFIELD_OFFSET + vendorID - 1));
        } catch {
            return false;
        }
    }

    /**
     * Get a bit of data from the parsed consent string
     * @param {Number} offset The offset to fetch from
     * @returns {Number} The requested bit
     * @memberof ConsentStringParser
     * @protected
     */
    _getBit(offset) {
        const binStr = this.consentData.substr(offset, 1);
        return parseInt(binStr, 10);
    }

    /**
     * Get a number from the parsed consent data
     * Takes a range of bits and converts them into an integer
     * @param {Number} offset The offset to read from
     * @param {Number} size The amount of bits to read
     * @returns {Number} The integer value of the bit range
     * @memberof ConsentStringParser
     * @protected
     */
    _getInt(offset, size) {
        const binStr = this.consentData.substr(offset, size);
        return convertBitstringToInteger(binStr);
    }

    /**
     * Process purposes from allowed purposes ID range
     * @memberof ConsentStringParser
     * @protected
     */
    _processPurposes() {
        this.allowedPurposes = [];
        for (let i = PURPOSES_OFFSET, max = PURPOSES_OFFSET + PURPOSES_SIZE; i < max; i += 1) {
            this.allowedPurposes.push(this._getBit(i));
        }
        this.purposes = [];
        for (let i = 1, max = this.allowedPurposes.length; i <= max; i += 1) {
            if (this.purposeAllowed(i)) {
                this.purposes.push(i);
            }
        }
    }

    /**
     * Process the vendors list by creating ranges of vendor IDs
     * @memberof ConsentStringParser
     * @protected
     */
    _processVendorsList() {
        this.rangeEntries = [];
        this.defaultConsent = this._getBit(DEFAULT_CONSENT_OFFSET);
        const numEntries = this._getInt(NUM_ENTRIES_OFFSET, NUM_ENTRIES_SIZE);
        let currentOffset = RANGE_ENTRY_OFFSET;
        for (let i = 0; i < numEntries; i += 1) {
            const range = Boolean(this._getBit(currentOffset));
            currentOffset += 1;
            if (range) {
                const vendorIDStart = this._getInt(currentOffset, VENDOR_ID_SIZE);
                currentOffset += VENDOR_ID_SIZE;
                const vendorIDEnd = this._getInt(currentOffset, VENDOR_ID_SIZE);
                currentOffset += VENDOR_ID_SIZE;
                this.rangeEntries.push(new VendorRangeEntry(vendorIDStart, vendorIDEnd));
            } else {
                const vendorID = this._getInt(currentOffset, VENDOR_ID_SIZE);
                currentOffset += VENDOR_ID_SIZE;
                this.rangeEntries.push(new VendorRangeEntry(vendorID));
            }
        }
    }

    /**
     * Check if a vendor ID appears in any ID range
     * @param {Number} vendorID The vendor ID number
     * @returns {Boolean} True if the vendor ID appears in a range,
     *  false otherwise
     * @memberof ConsentStringParser
     * @protected
     */
    _vendorInRange(vendorID) {
        const limit = this.rangeEntries.length;
		if (limit === 0) {
			return false;
		}
		let index = limit / 2;
		while (index >= 0 && index < limit) {
			const entry = this.rangeEntries[index];
			if (entry.containsVendorID(vendorID)) {
				return true;
			}
			if (index === 0 || index === limit - 1) {
				return false;
			}
			if (entry.vendorIDGreaterThanMax(vendorID)) {
				index = (index + ((limit - index) / 2));
			} else {
				index = index / 2;
			}
		}
		return false;
    }
}
