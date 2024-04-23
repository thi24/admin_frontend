export function byteToBase64(byteArray: number[]) {
    let binary = '';
    let bytes = new Uint8Array(byteArray);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}