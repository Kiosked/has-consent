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
});
