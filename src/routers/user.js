const { register, login, logout, employee_details,update_bm } = require("../controllers/user");
const { registerUser, loginUser } = require('../validations/user')
const commonValidator = require('../middleware/requestValidatorHandler')
const { authenticateToken, fb_middleware, roles_auth } = require('../middleware/auth')

const express = require("express");
const router = express.Router();

router.post("/register", commonValidator(registerUser), register);
router.post("/login", login);
router.post("/logout", authenticateToken, logout);
router.post("/organization", employee_details);
router.post("/assign-bm-am",authenticateToken, update_bm);


module.exports = router;
 