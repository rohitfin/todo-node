const express = require("express");
const router = express.Router();
const expressAsyncHandler = require("express-async-handler");
const decryptRequestBody = require("../services/encrypt-decrypt");
// const { authModel } = require("../models/Auth");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Login Route
router.post('/login', async (req, res) => {
  try {
    /**
    const { encryptedData } = req.body;

    if (!encryptedData) {
      return res.status(400).json({ success: false, message: "Missing encryptedData" });
    }

    // decrypt incoming data
    const decryptedBody = await decryptRequestBody(encryptedData);

    if (!decryptedString) {
      return res.status(400).json({ success: false, message: "Invalid encrypted data" });
    }
    req.body = JSON.parse(decryptedString);
 */

    const { userName, password } = req.body;
    const email = "admin@co.inn"
    const user = await User.findOne({ userName });

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.json({
        statusCode: 200,
        success: true,
        token,
        user: {
          id: user._id,
          userName: user.userName,
          email: user.email,
          number: user.number,
        },
      });
    } else {
      res.status(500).json({ error: err.message, message: "user not found!" });
    }


  } catch (err) {
    if (!res.headersSent) {   //check before sending
      res.status(500).json({ error: err.message });
      console.error("❌ Decrypt error:", err.message);
      res.status(400).json({ success: false, message: "Decryption failed" });
    }
  }

  res.send('Login route');
});

module.exports = router;
