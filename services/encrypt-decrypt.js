
const express = require("express");
const CryptoJS = require("crypto-js");

const app = express();
app.use(express.json());

const API_SECRET_KEY = process.env.ACCESS_TOKEN_KEY;

// 🔑 Decryption helper
function decryptRequestBody(encryptedData) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, API_SECRET_KEY);
  const decryptedString = bytes.toString(CryptoJS.enc.Utf8);

  if (!decryptedString) throw new Error("Decryption failed");

  return JSON.parse(decryptedString);
}
