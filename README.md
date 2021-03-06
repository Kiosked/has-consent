# Has-Consent
> GDPR consent string validation library

[![Build Status](https://travis-ci.org/Kiosked/has-consent.svg?branch=master)](https://travis-ci.org/Kiosked/has-consent) [![npm version](https://badge.fury.io/js/has-consent.svg)](https://www.npmjs.com/package/has-consent)

## About
Decoder of **GDPR consent strings** for the browser, including helpers to detect vendor permissions. If you're looking for something to use in NodeJS, try the [consent-string](https://github.com/InteractiveAdvertisingBureau/Consent-String-SDK-JS) library. This decoder is built for a smaller bundle size. Inspiration for this smaller library was taken from the [Java-based IAB consent string parser](https://github.com/triplelift/IAB-Consent-String-Parser).

## Installation
You can install via npm: `npm install has-consent --save-dev`

## Usage
This library is compiled to a CommonJS2 format bundle in the `/dist` directory. Both minified and non-minified copies are written, but the minified version is returned by the `main` property. **Has-Consent** should be referenced and included in your bundle, and is not intended to be dropped straight on to a web page.

```javascript
const { ConsentStringParser } = require("has-consent");

const MY_VENDOR_ID = 7;

const consent = new ConsentStringParser("BN5lERiOMYEdiAOAWeFRAAYAAaAAptQ");
consent.vendorAllowed(MY_VENDOR_ID); // true
```

This library also handles purposes validation. You can read more about the supported methods in the [API documentation](API.md);

### IAB Global Vendors List
You can find the complete list of IAB vendor IDs (along with purposes) [here](https://vendorlist.consensu.org/vendorlist.json).
