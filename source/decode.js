export function convertBitstringToInteger(binStr) {
    return parseInt(binStr, 2);
}

export function convertByteToBitstring(byte) {
    return zeroPad(byte.toString(2));
}

export function decodeBase64ToArrayBuffer(b64, win = window) {
    const binaryString = win.atob(b64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i += 1) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

function zeroPad(text, size=8) {
    let output = text;
    while (output.length < size) {
        output = `0${output}`;
    }
    return output;
}
