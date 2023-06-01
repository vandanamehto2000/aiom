const { register, login, logout, welcome } = require("../controllers/user");
const { registerUser, loginUser } = require('../validations/user')
const commonValidator = require('../middleware/requestValidatorHandler')
const { authenticateToken, fb_middleware, roles_auth } = require('../middleware/auth')

const express = require("express");
const router = express.Router();

router.post("/register", commonValidator(registerUser), register);
router.post("/login", login);
router.post("/logout", authenticateToken, fb_middleware, roles_auth(["admin", "business_owner"]), logout);

// router.post("/welcome", authenticateToken, fb_middleware, welcome)

module.exports = router;