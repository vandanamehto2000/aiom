const {create_campaign, get_campaign,create_adSet,get_adSet,create_creative,get_creative,create_ad} = require("../controllers/facebook");
const authenticateToken = require('../middleware/auth')
const express = require("express");
const router = express.Router();

router.post("/campaign/create", create_campaign);
router.get("/campaign/get", get_campaign);
router.post("/ad-set/create", create_adSet);
router.get("/ad-set/get", get_adSet);
router.post("/ad-creative/create", create_creative);
router.get("/ad-creative/get", get_creative);
router.post("/ad/create", create_ad);

module.exports = router;