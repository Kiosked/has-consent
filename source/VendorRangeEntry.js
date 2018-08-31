export default class VendorRangeEntry {
    constructor(...args) {
        this.maxVendorID = null;
        this.minVendorID = null;
        this.vendorIDs = [];
        if (args.length === 1) {
            this.vendorIDs.push(args[0]);
            this.maxVendorID = this.minVendorID = args[0];
        } else if (args.length === 2) {
            this.minVendorID = args[0];
            this.maxVendorID = args[1];
            for (let i = this.minVendorID; i <= this.maxVendorID; i += 1) {
                this.vendorIDs.push(i);
            }
        } else {
            throw new Error(`Expected 1 or 2 arguments, received ${args.length}`);
        }
    }

    containsVendorID(vendorID) {
        return this.vendorIDs.indexOf(vendorID) >= 0;
    }

    vendorIDGreaterThanMax(vendorID) {
        return vendorID > this.maxVendorID;
    }
}
