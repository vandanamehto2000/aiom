const {facebook_create_campaign} = require("../platform/facebook");
const authenticateToken = require('../middleware/auth')
const express = require("express");
const router = express.Router();

router.post("/campaign/create", facebook_create_campaign);

module.exports = router;