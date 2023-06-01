const { create_campaign, get_campaign, create_adSet, get_adSet, create_creative, get_creative, create_ad, get_account_pages, get_location_keys, create_creative_video_upload, create_creative_video } = require("../controllers/facebook");
const { authenticateToken, fb_middleware } = require('../middleware/auth')
const express = require("express");
const router = express.Router();


router.post("/campaign/create",authenticateToken, fb_middleware, create_campaign);
router.get("/campaign/get", authenticateToken, fb_middleware, get_campaign);
router.post("/ad-set/create", authenticateToken, fb_middleware,create_adSet);
router.get("/ad-set/get",authenticateToken, fb_middleware, get_adSet);
router.post("/ad-creative/create-image-existing", create_creative);
router.get("/ad-creative/get",authenticateToken, fb_middleware, get_creative);
router.post("/ad/create",authenticateToken, fb_middleware, create_ad);
router.get("/user/account/pages", authenticateToken, fb_middleware, get_account_pages);
router.get("/location", authenticateToken, fb_middleware,get_location_keys);
router.post("/ad-creative/upload/create_video", create_creative_video_upload);
router.post("/ad-creative/create_video", create_creative_video);

module.exports = router;