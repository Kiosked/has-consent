import { decodeBase64ToArrayBuffer } from "./decode.js";

export default class ConsentStringParser {
    constructor(consentString) {
        this.consentData = decodeBase64ToArrayBuffer(consentString);
    }
}
