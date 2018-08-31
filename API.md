## Modules

<dl>
<dt><a href="#module_HasConsent">HasConsent</a></dt>
<dd></dd>
</dl>

## Classes

<dl>
<dt><a href="#ConsentStringParser">ConsentStringParser</a></dt>
<dd></dd>
</dl>

<a name="module_HasConsent"></a>

## HasConsent
<a name="ConsentStringParser"></a>

## ConsentStringParser
**Kind**: global class  

* [ConsentStringParser](#ConsentStringParser)
    * [new ConsentStringParser()](#new_ConsentStringParser_new)
    * [.module.exports](#ConsentStringParser.module.exports)
        * [new module.exports(consentString)](#new_ConsentStringParser.module.exports_new)
    * [.cmpID](#ConsentStringParser.cmpID) : <code>Number</code>
    * [.cmpVersion](#ConsentStringParser.cmpVersion) : <code>Number</code>
    * [.vendorEncodingType](#ConsentStringParser.vendorEncodingType) : <code>Number</code>
    * [.version](#ConsentStringParser.version) : <code>Number</code>
    * [.purposeAllowed(purposeID)](#ConsentStringParser.purposeAllowed) ⇒ <code>Boolean</code>
    * [.vendorAllowed(vendorID)](#ConsentStringParser.vendorAllowed) ⇒ <code>Boolean</code>
    * [._getBit(offset)](#ConsentStringParser._getBit) ⇒ <code>Number</code>
    * [._getInt(offset, size)](#ConsentStringParser._getInt) ⇒ <code>Number</code>
    * [._processPurposes()](#ConsentStringParser._processPurposes)
    * [._processVendorsList()](#ConsentStringParser._processVendorsList)
    * [._vendorInRange(vendorID)](#ConsentStringParser._vendorInRange) ⇒ <code>Boolean</code>

<a name="new_ConsentStringParser_new"></a>

### new ConsentStringParser()
Parser instance for processing IAB consent strings

<a name="ConsentStringParser.module.exports"></a>

### ConsentStringParser.module.exports
**Kind**: static class of [<code>ConsentStringParser</code>](#ConsentStringParser)  
<a name="new_ConsentStringParser.module.exports_new"></a>

#### new module.exports(consentString)
Constructor for the parser

**Throws**:

- <code>Error</code> Throws for invalid consent strings


| Param | Type | Description |
| --- | --- | --- |
| consentString | <code>String</code> | The consent string |

<a name="ConsentStringParser.cmpID"></a>

### ConsentStringParser.cmpID : <code>Number</code>
CMP ID

**Kind**: static property of [<code>ConsentStringParser</code>](#ConsentStringParser)  
**Read only**: true  
<a name="ConsentStringParser.cmpVersion"></a>

### ConsentStringParser.cmpVersion : <code>Number</code>
CMP version

**Kind**: static property of [<code>ConsentStringParser</code>](#ConsentStringParser)  
**Read only**: true  
<a name="ConsentStringParser.vendorEncodingType"></a>

### ConsentStringParser.vendorEncodingType : <code>Number</code>
The encoding type used for the vendor(s) list

**Kind**: static property of [<code>ConsentStringParser</code>](#ConsentStringParser)  
**Read only**: true  
<a name="ConsentStringParser.version"></a>

### ConsentStringParser.version : <code>Number</code>
The consent string version used by the CMP

**Kind**: static property of [<code>ConsentStringParser</code>](#ConsentStringParser)  
**Read only**: true  
<a name="ConsentStringParser.purposeAllowed"></a>

### ConsentStringParser.purposeAllowed(purposeID) ⇒ <code>Boolean</code>
Check if a purpose is allowed

**Kind**: static method of [<code>ConsentStringParser</code>](#ConsentStringParser)  
**Returns**: <code>Boolean</code> - True if the purpose is allowed, false otherwise  

| Param | Type | Description |
| --- | --- | --- |
| purposeID | <code>Number</code> | The ID of the purpose to check |

<a name="ConsentStringParser.vendorAllowed"></a>

### ConsentStringParser.vendorAllowed(vendorID) ⇒ <code>Boolean</code>
Check if a vendor is allowed

**Kind**: static method of [<code>ConsentStringParser</code>](#ConsentStringParser)  
**Returns**: <code>Boolean</code> - True if the vendor is allowed, false otherwise  

| Param | Type | Description |
| --- | --- | --- |
| vendorID | <code>Number</code> | The ID of the vendor to check |

<a name="ConsentStringParser._getBit"></a>

### ConsentStringParser._getBit(offset) ⇒ <code>Number</code>
Get a bit of data from the parsed consent string

**Kind**: static method of [<code>ConsentStringParser</code>](#ConsentStringParser)  
**Returns**: <code>Number</code> - The requested bit  
**Access**: protected  

| Param | Type | Description |
| --- | --- | --- |
| offset | <code>Number</code> | The offset to fetch from |

<a name="ConsentStringParser._getInt"></a>

### ConsentStringParser._getInt(offset, size) ⇒ <code>Number</code>
Get a number from the parsed consent data
Takes a range of bits and converts them into an integer

**Kind**: static method of [<code>ConsentStringParser</code>](#ConsentStringParser)  
**Returns**: <code>Number</code> - The integer value of the bit range  
**Access**: protected  

| Param | Type | Description |
| --- | --- | --- |
| offset | <code>Number</code> | The offset to read from |
| size | <code>Number</code> | The amount of bits to read |

<a name="ConsentStringParser._processPurposes"></a>

### ConsentStringParser._processPurposes()
Process purposes from allowed purposes ID range

**Kind**: static method of [<code>ConsentStringParser</code>](#ConsentStringParser)  
**Access**: protected  
<a name="ConsentStringParser._processVendorsList"></a>

### ConsentStringParser._processVendorsList()
Process the vendors list by creating ranges of vendor IDs

**Kind**: static method of [<code>ConsentStringParser</code>](#ConsentStringParser)  
**Access**: protected  
<a name="ConsentStringParser._vendorInRange"></a>

### ConsentStringParser._vendorInRange(vendorID) ⇒ <code>Boolean</code>
Check if a vendor ID appears in any ID range

**Kind**: static method of [<code>ConsentStringParser</code>](#ConsentStringParser)  
**Returns**: <code>Boolean</code> - True if the vendor ID appears in a range,
 false otherwise  
**Access**: protected  

| Param | Type | Description |
| --- | --- | --- |
| vendorID | <code>Number</code> | The vendor ID number |

