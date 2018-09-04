const { ConsentString } = require("consent-string");
const { ConsentStringParser } = require("../dist/has-consent.js");
const globalVendorsList = require("./resources/vendorList.json");

describe("Consent-String integration", function() {
    it("detects allowed vendors", function() {
        const consentData = new ConsentString();
        consentData.setGlobalVendorList(globalVendorsList);
        consentData.setCmpId(1);
        consentData.setCmpVersion(1);
        consentData.setVendorsAllowed([1, 24, 245]);
        const consentString = consentData.getConsentString();
        const parser = new ConsentStringParser(consentString);
        expect(parser.vendorAllowed(1)).toBe(true);
        expect(parser.vendorAllowed(24)).toBe(true);
        expect(parser.vendorAllowed(245)).toBe(true);
    });

    it("detects disallowed vendors", function() {
        const consentData = new ConsentString();
        consentData.setGlobalVendorList(globalVendorsList);
        consentData.setCmpId(1);
        consentData.setCmpVersion(1);
        consentData.setVendorsAllowed([1, 24, 245]);
        const consentString = consentData.getConsentString();
        const parser = new ConsentStringParser(consentString);
        expect(parser.vendorAllowed(2)).toBe(false);
        expect(parser.vendorAllowed(23)).toBe(false);
        expect(parser.vendorAllowed(91)).toBe(false);
    });

    it("detects allowed purposes", function() {
        const consentData = new ConsentString();
        consentData.setGlobalVendorList(globalVendorsList);
        consentData.setCmpId(1);
        consentData.setCmpVersion(1);
        consentData.setPurposesAllowed([1, 2, 4]);
        const consentString = consentData.getConsentString();
        const parser = new ConsentStringParser(consentString);
        expect(parser.purposeAllowed(1)).toBe(true);
        expect(parser.purposeAllowed(2)).toBe(true);
        expect(parser.purposeAllowed(4)).toBe(true);
    });

    it("detects disallowed purposes", function() {
        const consentData = new ConsentString();
        consentData.setGlobalVendorList(globalVendorsList);
        consentData.setCmpId(1);
        consentData.setCmpVersion(1);
        consentData.setPurposesAllowed([1, 2, 4]);
        const consentString = consentData.getConsentString();
        const parser = new ConsentStringParser(consentString);
        expect(parser.purposeAllowed(3)).toBe(false);
        expect(parser.purposeAllowed(5)).toBe(false);
        expect(parser.purposeAllowed(6)).toBe(false);
    });
});
