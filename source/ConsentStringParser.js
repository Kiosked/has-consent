import { convertBitstringToInteger, convertByteToBitstring, decodeBase64ToArrayBuffer } from "./decode.js";

const CMP_ID_OFFSET = 78;
const CMP_ID_SIZE = 12;
const CMP_VERSION_OFFSET = 90;
const CMP_VERSION_SIZE = 12;
const VERSION_BIT_OFFSET = 0;
const VERSION_BIT_SIZE = 6;

export default class ConsentStringParser {
    constructor(consentString) {
        const buff = decodeBase64ToArrayBuffer(consentString);
        this.consentData = buff.reduce((binStr, nextByte) => {
            return `${binStr}${convertByteToBitstring(nextByte)}`;
        }, "");
    }

    get cmpID() {
        return this._getInt(CMP_ID_OFFSET, CMP_ID_SIZE);
    }

    get cmpVersion() {
        return this._getInt(CMP_VERSION_OFFSET, CMP_VERSION_SIZE);
    }

    get version() {
        return this._getInt(VERSION_BIT_OFFSET, VERSION_BIT_SIZE);
    }

    _getInt(offset, size) {
        const binStr = this.consentData.substr(offset, size);
        return convertBitstringToInteger(binStr);
    }
}
