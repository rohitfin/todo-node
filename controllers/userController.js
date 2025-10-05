const User = require("../models/User");
const expressAsyncHandler = require("express-async-handler");

// get all user
exports.getUser = expressAsyncHandler(async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ data: users });

    } catch (error) {
        res.status(500).json({ error: err.message });
    }
})

// get user by id
exports.getUserById = expressAsyncHandler(async (req, res) => {
    try {
        const userId = req.body.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
})

// create user
exports.createUser = expressAsyncHandler(async (req, res) => {
    const userData = req.body//.encryptedData;

    if (!userData.userName || !userData.email || !userData.password) {
        return res.status(400).json({
            code: 400,
            success: false,
            message: "❌ Missing required fields"
        });
    }

    // check if user already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
        return res.status(400).json({
            code: 400,
            success: false,
            message: "❌ User already exists"
        });
    }

    const newUser = await User.create(userData);

    return res.status(201).json({
        code: 201,
        success: true,
        message: "✅ User created successfully",
        user: {
            id: newUser._id,
            userName: newUser.userName,
            email: newUser.email,
            number: newUser.number
        }
    });
});
