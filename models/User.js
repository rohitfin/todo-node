const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    number: { type: Number },
    createdAt: { type: Date, default: Date.now }
})

const User = mongoose.model("User", userSchema);
module.exports = User;