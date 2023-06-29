const { create_campaign, get_Insights, create_adSet, get_adSet, create_creative, get_creative, create_ad, get_account_pages, get_location_keys, create_creative_video_upload, create_creative_video, get_page_video, get_ads, get_page_images,create_carousel,get_businesses, get_account_videos_images,update_campaign, update_adset,update_ads,get_campaign_by_id,get_adset_by_id,save_insight,get_initial_token} = require("../controllers/facebook");
const { authenticateToken, fb_middleware } = require('../middleware/auth')
const { uploadVideo, uploadImage, uploadImages } = require('../middleware/fileUpload')
const express = require("express");
const router = express.Router();

router.post("/campaign/create", authenticateToken, fb_middleware, create_campaign);
router.get("/insights/get", authenticateToken, fb_middleware, get_Insights);
router.post("/ad-set/create", authenticateToken, fb_middleware, create_adSet);
router.get("/ad-set/get", authenticateToken, fb_middleware, get_adSet);
router.get("/ad/get", authenticateToken, fb_middleware, get_ads);

router.post("/ad-creative/create-image-existing",authenticateToken, fb_middleware, uploadImage, create_creative);
router.get("/ad-creative/get",authenticateToken, fb_middleware, get_creative);
router.post("/ad/create",authenticateToken, fb_middleware, create_ad);
router.get("/user/account/pages",authenticateToken, fb_middleware, get_account_pages);
router.get("/location",authenticateToken, fb_middleware, get_location_keys);
router.post("/ad-creative/upload/create_video",authenticateToken, fb_middleware, uploadVideo, create_creative_video_upload);
router.post("/ad-creative/create_video",authenticateToken, fb_middleware, create_creative_video);
router.get("/videos", authenticateToken, fb_middleware,get_page_video)
router.get("/images",authenticateToken, fb_middleware, get_page_images)
router.post("/create-carousel",authenticateToken, fb_middleware,uploadImages, create_carousel)
router.get("/businesses",authenticateToken,fb_middleware,get_businesses)
router.get("/account/media",authenticateToken,fb_middleware,get_account_videos_images)
router.post("/campaign/update",authenticateToken,fb_middleware,update_campaign)
router.post("/adset/update",authenticateToken,fb_middleware,update_adset)
router.post("/ad/update",authenticateToken,fb_middleware,update_ads)
router.get("/campaign/get-campaign-by-id/:id",authenticateToken,fb_middleware,get_campaign_by_id)
router.get("/adset/get-adset-by-id/:id",authenticateToken,fb_middleware,get_adset_by_id)
router.post("/save-insight", authenticateToken, fb_middleware, save_insight);
router.post("/get-initial-token",authenticateToken,get_initial_token);


module.exports = router;