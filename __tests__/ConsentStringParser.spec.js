const { ConsentStringParser } = require("../dist/has-consent.js");

describe("ConsentStringParser", function() {
    let parser;

    beforeEach(function() {
        parser = new ConsentStringParser("BN5lERiOMYEdiAOAWeFRAAYAAaAAptQ");
    });

    it("decodes data successfully", function() {
        expect(typeof parser.consentData).toBe("string");
    });

    describe("get:cmpID", function() {
        it("returns the correct ID", function() {
            expect(parser.cmpID).toBe(14);
        });
    });

    describe("get:cmpVersion", function() {
        it("returns the correct version", function() {
            expect(parser.cmpVersion).toBe(22);
        });
    });

    describe("get:version", function() {
        it("returns the correct version", function() {
            expect(parser.version).toBe(1);
        });
    });

    describe("purposeAllowed", function() {
        it("detects allowance correctly for the purposes listed in example", function() {
            // Taken from: https://github.com/triplelift/IAB-Consent-String-Parser/blob/master/src/test/java/com/iab/gdpr/ConsentStringParserTest.java#L24
            expect(parser.purposeAllowed(2)).toBe(true);
            expect(parser.purposeAllowed(1)).toBe(false);
        });
    });

    describe("vendorAllowed", function() {
        it("detects allowance correctly for the vendors listed in example", function() {
            // Taken from: https://github.com/triplelift/IAB-Consent-String-Parser/blob/master/src/test/java/com/iab/gdpr/ConsentStringParserTest.java#L27
            expect(parser.vendorAllowed(1)).toBe(true);
            expect(parser.vendorAllowed(5)).toBe(true);
            expect(parser.vendorAllowed(7)).toBe(true);
            expect(parser.vendorAllowed(9)).toBe(true);
            expect(parser.vendorAllowed(0)).toBe(false);
            expect(parser.vendorAllowed(10)).toBe(false);
        });
    });
});
