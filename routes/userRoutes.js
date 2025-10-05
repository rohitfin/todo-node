const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");


router.get("/getUser", userController.getUser);

router.post("/getUserById", userController.getUserById);

router.post("/create", userController.createUser);



module.exports = router;