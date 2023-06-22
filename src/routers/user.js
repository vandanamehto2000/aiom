const { register, login, logout, employee_details, assigned_bm, role_update, delete_bm } = require("../controllers/user");
const { registerUser, loginUser } = require('../validations/user')
const commonValidator = require('../middleware/requestValidatorHandler')
const { authenticateToken, fb_middleware, roles_auth } = require('../middleware/auth')

const express = require("express");
const router = express.Router();

router.post("/register", commonValidator(registerUser), register);
router.post("/login", login);
router.post("/logout", authenticateToken, logout);
router.get("/organization", employee_details);
router.post("/assigned-bm", authenticateToken, assigned_bm)
router.post("/update-roles", authenticateToken, role_update)
router.delete("/delete-bm", authenticateToken, delete_bm)



module.exports = router;
