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
const RANGE_ENTRY_OFFSET = 186;
const VENDOR_BITFIELD_OFFSET = 173;
const VENDOR_ENCODING_RANGE = 1;
const VENDOR_ID_SIZE = 16;
const VERSION_BIT_OFFSET = 0;
const VERSION_BIT_SIZE = 6;

export default class ConsentStringParser {
    constructor(consentString) {
        this.consentString = consentString;
        const buff = decodeBase64ToArrayBuffer(consentString);
        this.consentData = buff.reduce((binStr, nextByte) => {
            return `${binStr}${convertByteToBitstring(nextByte)}`;
        }, "");
        if (this.vendorEncodingType === VENDOR_ENCODING_RANGE) {
            this._processVendorsList();
        }
    }

    get cmpID() {
        return this._getInt(CMP_ID_OFFSET, CMP_ID_SIZE);
    }

    get cmpVersion() {
        return this._getInt(CMP_VERSION_OFFSET, CMP_VERSION_SIZE);
    }

    get vendorEncodingType() {
        return this._getInt(ENCODING_TYPE_OFFSET, ENCODING_TYPE_SIZE);
    }

    get version() {
        return this._getInt(VERSION_BIT_OFFSET, VERSION_BIT_SIZE);
    }

    vendorAllowed(vendorID) {
        if (this.vendorEncodingType === VENDOR_ENCODING_RANGE) {
            const present = this._vendorInRange(vendorID);
            return present !== Boolean(this.defaultConsent);
        } else {
            try {
                return Boolean(this._getBit(VENDOR_BITFIELD_OFFSET + vendorID - 1));
            } catch {
                return false;
            }
        }
    }

    _getBit(offset) {
        const binStr = this.consentData.substr(offset, 1);
        return parseInt(binStr, 10);
    }

    _getInt(offset, size) {
        const binStr = this.consentData.substr(offset, size);
        return convertBitstringToInteger(binStr);
    }

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
