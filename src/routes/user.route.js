
const express = require('express');
const router = express.Router();
const userController = require("../controllers/user.controller.js");
const authenticate = require('../middlewares/auth')


router.post("/signup", userController.signUp);
router.post("/login", userController.login);
router.get("/profile", authenticate, userController.profile);
router.get("/all", authenticate, userController.getAllUser);
router.get("/:id", authenticate, userController.getUser);



module.exports = router;