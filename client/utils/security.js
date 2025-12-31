const CryptoJS = require("crypto-js");

// 1. GENERATE KEY
// We hash the Master Password to create a predictable 256-bit key.
// In a real production app, we would use PBKDF2 with a salt for extra protection.
const generateKey = (masterPassword) => {
    return CryptoJS.SHA256(masterPassword).toString();
};

// 2. ENCRYPT
// Takes the data object (username/password) and locks it with the Master Password
const encryptData = (data, masterPassword) => {
    const key = generateKey(masterPassword);
    const dataString = JSON.stringify(data);
    // AES Encrypt
    const encrypted = CryptoJS.AES.encrypt(dataString, key).toString();
    return encrypted;
};

// 3. DECRYPT
// Unlocks the data. Returns NULL if the password is wrong or data is corrupted.
const decryptData = (ciphertext, masterPassword) => {
    try {
        const key = generateKey(masterPassword);
        const bytes = CryptoJS.AES.decrypt(ciphertext, key);
        const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
        
        if (!decryptedString) return null; // Wrong key usually results in empty string here
        
        return JSON.parse(decryptedString);
    } catch (e) {
        return null;
    }
};

module.exports = { encryptData, decryptData };