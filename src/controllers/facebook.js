"use strict";
const {
  facebook_create_campaign,
  facebook_get_campaign,
  facebook_create_adSet,
  facebook_get_adSet,
  facebook_create_creative,
  facebook_get_creative,
  facebook_create_ad,
  facebook_get_user_account_id,
  facebook_get_accounts_pages,
  facebook_get_location,
  facebook_create_creative_video_upload,
  facebook_create_creative_video,
  facebook_get_ads
} = require("../platform/facebook");

const fields_constant = require('../utils/constant')
const { StatusCodes } = require("http-status-codes");
const multer = require("multer");
const responseApi = require("../utils/apiresponse");
const { APIResponse } = require("facebook-nodejs-business-sdk");

//multer for file upload
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

let upload = multer({ storage: storage });
const uploadVideo = upload.fields([{ name: 'source', maxCount: 1 }, { name: 'thumb', maxCount: 1 }]);
const uploadImage = upload.single("hasImage");



//Create a Campaign
const create_campaign = async (req, res, next) => {
  try {
    const { id, fields, params } = req.body;
    if (!(id && fields && params)) {
      return responseApi.ErrorResponse(res, "All input is required", "", StatusCodes.BAD_REQUEST)
    }

    if (!(params.name && params.objective && params.special_ad_categories)) {
      return responseApi.ErrorResponse(res, "One of the fields is missing-(name, objective, special_ad_categories)", "", StatusCodes.BAD_REQUEST)
    }

    const facebook_result = await facebook_create_campaign(id, fields, params);
    if (facebook_result.status == "success") {
      return responseApi.successResponseWithData(res, "create campaign data", facebook_result.data, StatusCodes.CREATED);
    } else {
      return responseApi.ErrorResponse(res, "unable to create campaign data", facebook_result.data, StatusCodes.BAD_REQUEST);
    }
  } catch (error) {
    console.log("error", error)
    return responseApi.ErrorResponse(res, "error", error.message ? error.message : error);
  }
};

//Get a Campaign
const get_campaign = async (req, res, next) => {
  try {
    let { id, fields, params } = req.query;
    fields = fields_constant.fields[fields]
    params = JSON.parse(params);
    const campaignss = await facebook_get_campaign(id, fields, params);
    if (campaignss.status == "success") {
      return responseApi.successResponseWithData(res, "campaign data found", campaignss.data, StatusCodes.OK);
    } else {
      return responseApi.ErrorResponse(res, "unable to find campaign data", campaignss.data, StatusCodes.BAD_REQUEST);
    }
  } catch (error) {
    console.log("error", error)
    console.log("Error Message:" + error);
    console.log("Error Stack:" + error.stack);
    return responseApi.ErrorResponse(res, "error", error.message ? error.message : error);
  }
};

//Create AdSET
const create_adSet = async (req, res, next) => {
  try {
    const { id, fields, params } = req.body;
    if (!(id && fields && params)) {
      return responseApi.ErrorResponse(res, "All input is required, One of the fields is missing-(id, fields, params)", "", StatusCodes.BAD_REQUEST)
    }

    const adsets = await facebook_create_adSet(id, fields, params);
    if (adsets.status === "success") {
      return responseApi.successResponseWithData(res, "create adSet data", adsets.data, StatusCodes.CREATED);
    } else {
      return responseApi.ErrorResponse(res, "unable to create adSet data", adsets.data, StatusCodes.BAD_REQUEST);
    }
  } catch (error) {
    console.log("Error", error)
    return responseApi.ErrorResponse(res, "error", error.message ? error.message : error);
  }
};

const get_adSet = async (req, res, next) => {
  try {
    let { id, fields } = req.query;
    fields = fields_constant.fields[fields]
    let params = {};
    const adset_data = await facebook_get_adSet(id, fields, params);
    if (adset_data.status == "success") {
      return responseApi.successResponseWithData(res, "adSet data found", adset_data.data, StatusCodes.OK);
    } else {
      return responseApi.ErrorResponse(res, "unable to find adSet data", adset_data.data, StatusCodes.BAD_REQUEST);
    }
  } catch (error) {
    console.log("Error", error);
    return responseApi.ErrorResponse(res, "error", error.message ? error.message : error);
  }
};

//Create creative
const create_creative = async (req, res, next) => {
  try {
    uploadImage(req, res, async function (err) {
      if (err instanceof multer.MulterError || err) {
       // console.log("-------------------err",err,req.file,!req.file)
      // console.log("-------------------try")
      if (err instanceof multer.MulterError || !req.file || err) {
        // console.log("-------------------err",err,req.file,!req.file)
        return responseApi.ErrorResponse(res, "error", err, StatusCodes.BAD_REQUEST);
      } else {
        let { id, fields, params } = req.body;
        fields = JSON.parse(fields);
        params = JSON.parse(params);
        const adcreatives = await facebook_create_creative(path, filename, id, fields, params);
        if (adcreatives.status == "success") {
          return responseApi.successResponseWithData(res, "create creative data", adcreatives.data, StatusCodes.CREATED);
        } else {
          return responseApi.ErrorResponse(res, "unable to create creative data", adcreatives.data, StatusCodes.BAD_REQUEST);
        }
      }
    }
  })
  } catch (error) {
    console.log(error);
    return responseApi.ErrorResponse(res, "error", error.message ? error.message : error);
  }
};

const create_creative_video_upload = async (req, res, next) => {
  try {
    uploadVideo(req, res, async function (err) {
      if (err instanceof multer.MulterError || !req.files || err) {
        return responseApi.ErrorResponse(res, "error", err, StatusCodes.BAD_REQUEST);
      } else {
        let thumbFieldname,thumbFileName,thumbPath,sourceFieldname,videoPath;
        if("thumb" in req.files){
           thumbFieldname=req.files.thumb[0].fieldname;
           thumbFileName = req.files.thumb[0].filename;
           thumbPath = req.files.thumb[0].path;
           sourceFieldname=req.files.source[0].fieldname;
           videoPath=req.files.source[0].path;
        }
        else{
          sourceFieldname=req.files.source[0].fieldname;
          videoPath=req.files.source[0].path;
        }
        let { id, fields, params,page_id } = req.body;
        if(!page_id){
        let thumbFieldname = req.files.thumb[0].fieldname;
        let thumbFileName = req.files.thumb[0].filename;
        let thumbPath = req.files.thumb[0].path;
        let sourceFieldname = req.files.source[0].fieldname;
        let videoPath = req.files.source[0].path;
        let { id, fields, params, page_id } = req.body;
        if (!page_id) {
          return responseApi.ErrorResponse(res, "page_id is required", "", StatusCodes.BAD_REQUEST);
        }
        fields = JSON.parse(fields);
        params = JSON.parse(params);
        const result = await facebook_create_creative_video(thumbPath, thumbFieldname, thumbFileName, videoPath, sourceFieldname, id, fields, params, page_id);
        if (result.status == "success") {
          return responseApi.successResponseWithData(res, "create creative video data", result, StatusCodes.CREATED);
        } else {
          return responseApi.ErrorResponse(res, "unable to create creative video data", result, StatusCodes.BAD_REQUEST);
        }
      }
    }
  })
  } catch (error) {
    console.log(error);
    return responseApi.ErrorResponse(res, "error", error.message ? error.message : error);
  }
};

//get Creative
const get_creative = async (req, res, next) => {
  try {
    let { id, fields, page_id } = req.query;
    fields = fields_constant.fields[fields]
     //id = JSON.parse(id);  //ad_account_id
    // id = JSON.parse(id);  //ad_account_id
    let params = {};
    const creative_data = await facebook_get_creative(id, fields, params, page_id);
    if (creative_data.status == "success") {
      return responseApi.successResponseWithData(res, "creative data found", creative_data.data, StatusCodes.OK);
    } else {
      return responseApi.ErrorResponse(res, "unable to find creative data", creative_data.data, StatusCodes.BAD_REQUEST);
    }
  } catch (error) {
    console.log(error);
    console.log("Error Message:" + error);
    console.log("Error Stack:" + error.stack);
    return responseApi.ErrorResponse(res, "error", error.message ? error.message : error);
  }
};

//Create Ad
const create_ad = async (req, res, next) => {
  try {
    let { id, fields, params } = req.body;
    const ads = await facebook_create_ad(id, fields, params);
    return next({
      status: StatusCodes.CREATED,
      message: "success",
      data: ads,
    });
  } catch (error) {
    console.log(error);
    console.log("Error Message:" + error);
    console.log("Error Stack:" + error.stack);
    return next({
      status: StatusCodes.BAD_REQUEST,
      message: "error",
      data: error,
    });
  }
};

const get_ads = async (req, res, next) => {
  try {
    let { id, fields } = req.query;
    fields = fields_constant.fields[fields]
    let params = {}
    const ad_data = await facebook_get_ads(id, fields, params)          //id here is Adset_id 
    if (ad_data.status == "success") {
      return responseApi.successResponseWithData(res, "ad data found", ad_data.data, StatusCodes.OK);
    } else {
      return responseApi.ErrorResponse(res, "unable to find ad data", ad_data.data, StatusCodes.BAD_REQUEST);
    }
  } catch (error) {
    console.log(error);
    return next({
      status: StatusCodes.BAD_REQUEST,
      message: "error",
      data: error,
    });
  }

}


const get_account_pages = async (req, res, next) => {
  try {
    const account_pages = await facebook_get_accounts_pages(req.facebook_token);
    if (account_pages.status !== "success") {
      return responseApi.ErrorResponse(res, "unable to find account page data", account_pages.data, StatusCodes.BAD_REQUEST);
    }
    return responseApi.successResponseWithData(res, "account pages data found", account_pages.data, StatusCodes.OK);
  } catch (error) {
    console.log(error);
    console.log("Error Message:" + error);
    console.log("Error Stack:" + error.stack);
    return responseApi.ErrorResponse(res, "error", error.message ? error.message : error);
  }
}

const get_location_keys = async (req, res, next) => {
  try {
    let { location, country_code } = req.query;
    location = JSON.parse(location)
    if (!location) {
      return responseApi.ErrorResponse(res, "Location Params is required ", "", StatusCodes.BAD_REQUEST)
    }
    const location_details = await facebook_get_location(location,req.facebook_token)
    let filtered_location = location_details.data
    if (country_code) {
      filtered_location = location_details.data.data.filter((item) => {
        return `"${item.country_code}"` == country_code
      })
    }
    if (location_details.status === "success") {
      return responseApi.successResponseWithData(res, "location data found", filtered_location, StatusCodes.OK)
    } else {
      return responseApi.ErrorResponse(res, "unable to find location data", location_details.data, StatusCodes.BAD_REQUEST)
    }

  } catch (error) {
    return responseApi.ErrorResponse(res, "error", error.message ? error.message : error);
  }
}

const create_creative_video = async (req, res, next) => {
  try {
    const { id, fields, params } = req.body;
    if (!(id && fields && params)) {
      return responseApi.ErrorResponse(res, "All input is required, One of the fields is missing-(id, fields, params)","", StatusCodes.BAD_REQUEST)
    }

    const adcreativess = await facebook_create_creative_video(id, fields, params);
    if (adcreativess.status === "success") {
      return responseApi.successResponseWithData(res, "success", adcreativess.data, StatusCodes.CREATED);
    } else {
      return responseApi.ErrorResponse(res, "error", adcreativess.data, StatusCodes.BAD_REQUEST);
    }
  } catch (error) {
    console.log("Error", error)
    return responseApi.ErrorResponse(res, "error", error.message ? error.message : error);
  }
};

module.exports = {
  create_campaign,
  get_campaign,
  create_adSet,
  get_adSet,
  create_creative,
  create_creative_video,
  get_creative,
  create_ad,
  get_account_pages,
  get_location_keys,
  create_creative_video_upload
};
