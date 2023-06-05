const {create_campaign, get_campaign,create_adSet,get_adSet,create_creative,get_creative,create_ad, get_account_pages, get_location_keys,create_creative_video_upload,create_creative_video, get_page_video, get_ads, get_page_images} = require("../controllers/facebook");
const authenticateToken = require('../middleware/auth')
const {uploadVideo,uploadImage} = require('../middleware/fileUpload')
const express = require("express");
const router = express.Router();

router.post("/campaign/create", authenticateToken, fb_middleware, create_campaign);
router.get("/campaign/get",authenticateToken, fb_middleware, get_campaign);
router.post("/ad-set/create",authenticateToken, fb_middleware, create_adSet);
router.get("/ad-set/get",authenticateToken, fb_middleware, get_adSet);
router.get("/ad/get", authenticateToken, fb_middleware,get_ads);

router.post("/ad-creative/create-image-existing",uploadImage, create_creative);
router.get("/ad-creative/get", get_creative);
router.post("/ad/create", create_ad);
router.get("/user/account/pages",get_account_pages);
router.get("/location",get_location_keys);
router.post("/ad-creative/upload/create_video", uploadVideo, create_creative_video_upload);
router.post("/ad-creative/create_video", create_creative_video);
router.get("/videos",get_page_video)
router.get("/images",get_page_images)

module.exports = router;