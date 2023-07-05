const { register, login, logout, employee_details, assigned_bm, role_update, delete_bm, add_users, select_asset } = require("../controllers/user");
const { registerUser, loginUser } = require('../validations/user')
const commonValidator = require('../middleware/requestValidatorHandler')
const { authenticateToken, fb_middleware, roles_auth } = require('../middleware/auth')

const express = require("express");
const router = express.Router();

router.post("/register", commonValidator(registerUser), register);
router.post("/login", login);
router.post("/logout", authenticateToken, logout);
router.get("/organization",authenticateToken,roles_auth(["admin","employee"]), employee_details);
router.post("/assigned-bm", authenticateToken,fb_middleware,roles_auth(["admin"]), assigned_bm)
router.post("/update-roles", authenticateToken, roles_auth(["admin"]),role_update)
router.delete("/delete-bm", authenticateToken, roles_auth(["admin"]),delete_bm)
router.post("/invite",authenticateToken,roles_auth(["admin"]),add_users)
router.post("/select-asset",authenticateToken,select_asset)



module.exports = router;
