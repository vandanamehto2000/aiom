"use strict";
const {
  facebook_create_campaign,
  facebook_get_Insights,
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
  facebook_get_ads,
  facebook_get_video,
  facebook_get_images,
  facebook_create_carousel,
  facebook_get_businesses,
  facebook_get_account_videos,

  facebook_get_account_images,
  facebook_save_Insights
  facebook_update_campaign
} = require("../platform/facebook");

const fields_constant = require("../utils/constant");
const { StatusCodes } = require("http-status-codes");
const responseApi = require("../utils/apiresponse");
const { APIResponse } = require("facebook-nodejs-business-sdk");


//Create a Campaign
const create_campaign = async (req, res, next) => {
  try {
    const { id, fields, params } = req.body;
    if (!(id && fields && params)) {
      return responseApi.ErrorResponse(
        res,
        "All input is required",
        "",
        StatusCodes.BAD_REQUEST
      );
    }

    if (!(params.name && params.objective && params.special_ad_categories)) {
      return responseApi.ErrorResponse(
        res,
        "One of the fields is missing-(name, objective, special_ad_categories)",
        "",
        StatusCodes.BAD_REQUEST
      );
    }

    const facebook_result = await facebook_create_campaign(id, fields, params);
    if (facebook_result.status == "success") {
      return responseApi.successResponseWithData(
        res,
        "create campaign data",
        facebook_result.data,
        StatusCodes.CREATED
      );
    } else {
      return responseApi.ErrorResponse(
        res,
        "unable to create campaign data",
        facebook_result.data,
        StatusCodes.BAD_REQUEST
      );
    }
  } catch (error) {
    console.log("error", error);
    return responseApi.ErrorResponse(
      res,
      "error",
      error.message ? error.message : error
    );
  }
};

//Get a Campaign
const get_Insights = async (req, res, next) => {
  try {
    let { object_id, level, params } = req.query;
    fields = fields_constant.fields[1];
    params = JSON.parse(params);
    const insights = await facebook_get_Insights(
      object_id,
      fields,
      level,
      req.facebook_token,
      params
    );
    if (insights.status == "success") {
      return responseApi.successResponseWithData(
        res,
        "insights data found",
        insights.data,
        StatusCodes.OK
      );
    } else {
      return responseApi.ErrorResponse(
        res,
        "unable to find insights data",
        insights.data,
        StatusCodes.BAD_REQUEST
      );
    }
  } catch (error) {
    console.log("error", error);
    console.log("Error Message:" + error);
    console.log("Error Stack:" + error.stack);
    return responseApi.ErrorResponse(
      res,
      "error",
      error.message ? error.message : error
    );
  }
};

//Create AdSET
const create_adSet = async (req, res, next) => {
  try {
    const { id, fields, params } = req.body;
    if (!(id && fields && params)) {
      return responseApi.ErrorResponse(
        res,
        "All input is required, One of the fields is missing-(id, fields, params)",
        "",
        StatusCodes.BAD_REQUEST
      );
    }

    const adsets = await facebook_create_adSet(id, fields, params);
    if (adsets.status === "success") {
      return responseApi.successResponseWithData(
        res,
        "create adSet data",
        adsets.data,
        StatusCodes.CREATED
      );
    } else {
      return responseApi.ErrorResponse(
        res,
        "unable to create adSet data",
        adsets.data,
        StatusCodes.BAD_REQUEST
      );
    }
  } catch (error) {
    console.log("Error", error);
    return responseApi.ErrorResponse(
      res,
      "error",
      error.message ? error.message : error
    );
  }
};

const get_adSet = async (req, res, next) => {
  try {
    let { id, fields } = req.query;
    fields = fields_constant.fields[fields];
    let params = {};
    const adset_data = await facebook_get_adSet(id, fields, params);
    if (adset_data.status == "success") {
      return responseApi.successResponseWithData(
        res,
        "adSet data found",
        adset_data.data,
        StatusCodes.OK
      );
    } else {
      return responseApi.ErrorResponse(
        res,
        "unable to find adSet data",
        adset_data.data,
        StatusCodes.BAD_REQUEST
      );
    }
  } catch (error) {
    console.log("Error", error);
    return responseApi.ErrorResponse(
      res,
      "error",
      error.message ? error.message : error
    );
  }
};

//Create creative
const create_creative = async (req, res, next) => {
  try {
    const access_token = req.facebook_token;
    let { id, fields, params } = req.body;
    fields = JSON.parse(fields);
    params = JSON.parse(params);
    if (req.file) {
      let { path, filename, originalname, fieldname } = req.file;
      const adcreatives = await facebook_create_creative(
        path,
        filename,
        id,
        fields,
        params,
        access_token
      );
      if (adcreatives.status == "success") {
        return responseApi.successResponseWithData(
          res,
          "New creative image data post Successfully",
          adcreatives.data,
          StatusCodes.CREATED
        );
      } else {
        return responseApi.ErrorResponse(
          res,
          "error",
          adcreatives.data,
          StatusCodes.BAD_REQUEST
        );
      }
    } else {
      // existing code
      if ("object_story_id" in params) {
        const adcreatives = await facebook_create_creative(
          null,
          null,
          id,
          fields,
          params
        );
        if (adcreatives.status == "success") {
          return responseApi.successResponseWithData(
            res,
            "Existing data post successfully",
            adcreatives.data,
            StatusCodes.CREATED
          );
        } else {
          return responseApi.ErrorResponse(
            res,
            "error",
            adcreatives.data,
            StatusCodes.BAD_REQUEST
          );
        }
      } else {
        return responseApi.ErrorResponse(
          res,
          " Error in existing video or image",
          adcreatives.data,
          StatusCodes.BAD_REQUEST
        );
      }
    }
  } catch (error) {
    console.log(error);
    return responseApi.ErrorResponse(
      res,
      "error",
      error.message ? error.message : error
    );
  }
};

const create_creative_video_upload = async (req, res, next) => {
  try {
    let thumbFieldname, thumbFileName, thumbPath, sourceFieldname, videoPath;
    if ("thumb" in req.files) {
      thumbFieldname = req.files.thumb[0].fieldname;
      thumbFileName = req.files.thumb[0].filename;
      thumbPath = req.files.thumb[0].path;
      sourceFieldname = req.files.source[0].fieldname;
      videoPath = req.files.source[0].path;
    } else {
      sourceFieldname = req.files.source[0].fieldname;
      videoPath = req.files.source[0].path;
    }
    let { id, fields, params, page_id } = req.body;
    if (!page_id) {
      return responseApi.ErrorResponse(
        res,
        "page_id is required",
        "",
        StatusCodes.BAD_REQUEST
      );
    }
    fields = JSON.parse(fields);
    params = JSON.parse(params);
    const result = await facebook_create_creative_video_upload(
      thumbPath,
      thumbFieldname,
      thumbFileName,
      videoPath,
      sourceFieldname,
      id,
      fields,
      params,
      page_id,
      req.facebook_token
    );

    if (result.status == "success") {
      return responseApi.successResponseWithData(
        res,
        "Video uploaded successfully",
        result.data,
        StatusCodes.CREATED
      );
    } else {
      return responseApi.ErrorResponse(
        res,
        "error",
        result,
        StatusCodes.BAD_REQUEST
      );
    }
  } catch (error) {
    console.log(error);
    return responseApi.ErrorResponse(
      res,
      "error",
      error.message ? error.message : error
    );
  }
};

//get Creative
const get_creative = async (req, res, next) => {
  try {
    let { id, fields, page_id } = req.query;
    fields = fields_constant.fields[fields];
    let params = {};
    const creative_data = await facebook_get_creative(
      id,
      fields,
      params,
      page_id,
      req.facebook_token
    );
    if (creative_data.status == "success") {
      return responseApi.successResponseWithData(
        res,
        "creative data found",
        creative_data.data,
        StatusCodes.OK
      );
    } else {
      return responseApi.ErrorResponse(
        res,
        "unable to find creative data",
        creative_data.data,
        StatusCodes.BAD_REQUEST
      );
    }
  } catch (error) {
    console.log(error);
    console.log("Error Message:" + error);
    console.log("Error Stack:" + error.stack);
    return responseApi.ErrorResponse(
      res,
      "error",
      error.message ? error.message : error
    );
  }
};

//Create Ad
const create_ad = async (req, res, next) => {
  try {
    let { id, fields, params } = req.body;
    const ads = await facebook_create_ad(id, fields, params);
    if (ads.status === "success") {
      return responseApi.successResponseWithData(
        res,
        "Ad created successfully",
        ads.data,
        StatusCodes.CREATED
      );
    } else {
      return responseApi.ErrorResponse(
        res,
        "error while creating ad",
        ads.data,
        StatusCodes.BAD_REQUEST
      );
    }
  } catch (error) {
    console.log(error);
    return responseApi.ErrorResponse(
      res,
      "error",
      error.message ? error.message : error
    );
  }
};

const get_ads = async (req, res, next) => {
  try {
    let { id, fields } = req.query;
    fields = fields_constant.fields[fields];
    let params = {};
    const ad_data = await facebook_get_ads(id, fields, params); //id here is Adset_id
    if (ad_data.status == "success") {
      return responseApi.successResponseWithData(
        res,
        "ad data found",
        ad_data.data,
        StatusCodes.OK
      );
    } else {
      return responseApi.ErrorResponse(
        res,
        "unable to find ad data",
        ad_data.data,
        StatusCodes.BAD_REQUEST
      );
    }
  } catch (error) {
    console.log(error);
    return responseApi.ErrorResponse(res, ad_data.data, error);
  }
};

const get_account_pages = async (req, res, next) => {
  try {
    const account_pages = await facebook_get_accounts_pages(req.facebook_token);
    if (account_pages.status !== "success") {
      return responseApi.ErrorResponse(
        res,
        "unable to find account page data",
        account_pages.data,
        StatusCodes.BAD_REQUEST
      );
    }
    return responseApi.successResponseWithData(
      res,
      "account pages data found",
      account_pages.data,
      StatusCodes.OK
    );
  } catch (error) {
    console.log(error);
    console.log("Error Message:" + error);
    console.log("Error Stack:" + error.stack);
    return responseApi.ErrorResponse(
      res,
      "error",
      error.message ? error.message : error
    );
  }
};

const get_location_keys = async (req, res, next) => {
  try {
    let { location, country_code } = req.query;
    location = JSON.parse(location);
    if (!location) {
      return responseApi.ErrorResponse(
        res,
        "Location Params is required ",
        "",
        StatusCodes.BAD_REQUEST
      );
    }
    const location_details = await facebook_get_location(
      location,
      req.facebook_token
    );
    let filtered_location = location_details.data;
    if (country_code) {
      filtered_location = location_details.data.data.filter((item) => {
        return `"${item.country_code}"` == country_code;
      });
    }
    if (location_details.status === "success") {
      return responseApi.successResponseWithData(
        res,
        "location data found",
        filtered_location,
        StatusCodes.OK
      );
    } else {
      return responseApi.ErrorResponse(
        res,
        "unable to find location data",
        location_details.data,
        StatusCodes.BAD_REQUEST
      );
    }
  } catch (error) {
    return responseApi.ErrorResponse(
      res,
      "error",
      error.message ? error.message : error
    );
  }
};

const create_creative_video = async (req, res, next) => {
  try {
    const { id, fields, params } = req.body;
    if (!(id && fields && params)) {
      return responseApi.ErrorResponse(
        res,
        "All input is required, One of the fields is missing-(id, fields, params)",
        "",
        StatusCodes.BAD_REQUEST
      );
    }

    const adcreativess = await facebook_create_creative_video(
      id,
      fields,
      params
    );
    if (adcreativess.status === "success") {
      return responseApi.successResponseWithData(
        res,
        "success",
        adcreativess.data,
        StatusCodes.CREATED
      );
    } else {
      return responseApi.ErrorResponse(
        res,
        "error",
        adcreativess.data,
        StatusCodes.BAD_REQUEST
      );
    }
  } catch (error) {
    console.log("Error", error);
    return responseApi.ErrorResponse(
      res,
      "error",
      error.message ? error.message : error
    );
  }
};

const get_page_video = async (req, res, next) => {
  try {
    const access_token = req.facebook_token;
    let { page_id, thumbnail, video_id } = req.query;
    let video_data;
    if (video_id) {
      video_data = await facebook_get_video(page_id, access_token, video_id);
    } else {
      video_data = await facebook_get_video(page_id, access_token);
    }
    if (video_data.status == "success") {
      for (let i = 0; i < video_data.data.length; i++) {
        if (thumbnail == "single") {
          video_data.data[i].thumbnails = video_data.data[i].thumbnails.data[0];
        } else {
          video_data.data[i].thumbnails = video_data.data[i].thumbnails.data;
        }
      }
      if (video_data.data.length === 0) {
        return responseApi.successResponseWithData(
          res,
          "Please wait for Facebook databse to update the video details!!",
          video_data.data,
          StatusCodes.OK
        );
      }
      return responseApi.successResponseWithData(
        res,
        "Video data found",
        video_data.data
      );
    } else {
      return responseApi.ErrorResponse(
        res,
        "unable to find creative data",
        video_data.data,
        StatusCodes.BAD_REQUEST
      );
    }
  } catch (error) {
    console.log("Error", error);
    return responseApi.ErrorResponse(
      res,
      error.message ? error.message : "error",
      error
    );
  }
};

const get_page_images = async (req, res, next) => {
  try {
    let { page_id } = req.query;
    if (!page_id) {
      return responseApi.ErrorResponse(
        res,
        "Page ID is required",
        "",
        StatusCodes.BAD_REQUEST
      );
    }
    let images = await facebook_get_images(page_id);
    if ((images.status = "success")) {
      return responseApi.successResponseWithData(
        res,
        "Image data found",
        images.data
      );
    } else {
      return responseApi.ErrorResponse(
        res,
        "unable to find image data",
        images.data,
        StatusCodes.BAD_REQUEST
      );
    }
  } catch (error) {
    console.log(error);
    return responseApi.ErrorResponse(res, "Internal server Error", error);
  }
};

const get_businesses = async (req, res, next) => {
  try {
    const businesses = await facebook_get_businesses(req.facebook_token);

    if (businesses.status === "success") {
      return responseApi.successResponseWithData(
        res,
        "Businessses Found",
        businesses.data
      );
    } else {
      return responseApi.ErrorResponse(
        res,
        "unable to find businesses data",
        businesses.data,
        StatusCodes.BAD_REQUEST
      );
    }
  } catch (error) {
    console.log(error);
    return responseApi.ErrorResponse(res, "Internal server Error", error);
  }
};

const create_carousel = async (req, res, next) => {
  try {
    const access_token = req.facebook_token;
    let { id, name, object_story_spec } = req.body;
    object_story_spec = JSON.parse(object_story_spec);
    let fileData = req.files;
    const carousels = await facebook_create_carousel(
      id,
      name,
      object_story_spec,
      fileData,
      access_token
    );
    if (carousels.status === "success") {
      return responseApi.successResponseWithData(
        res,
        "Carousel data Successfully post!!",
        carousels.data,
        StatusCodes.CREATED
      );
    } else {
      return responseApi.ErrorResponse(
        res,
        "error",
        carousels.data,
        StatusCodes.BAD_REQUEST
      );
    }
  } catch (error) {
    console.log("Error", error);
    return responseApi.ErrorResponse(
      res,
      "error",
      error.message ? error.message : error
    );
  }
};

const get_account_videos_images = async (req, res, next) => {
  try {
    const { ad_account_id, get_field } = req.query;
    if (get_field === "video") {
      const videos = await facebook_get_account_videos(
        ad_account_id,
        req.facebook_token
      );
      if (videos.status === "success") {
        return responseApi.successResponseWithData(
          res,
          "Account Video Data Found!!",
          videos.data,
          StatusCodes.Ok
        );
      } else {
        return responseApi.ErrorResponse(
          res,
          "Unable to fetch video data",
          videos.data,
          StatusCodes.BAD_REQUEST
        );
      }
    } else if (get_field === "image") {
      const images = await facebook_get_account_images(
        ad_account_id,
        req.facebook_token
      );
      if (images.status === "success") {
        return responseApi.successResponseWithData(
          res,
          "Account Image Data Found!!",
          images.data,
          StatusCodes.Ok
        );
      } else {
        return responseApi.ErrorResponse(
          res,
          "Unable to fetch Image data",
          images.data,
          StatusCodes.BAD_REQUEST
        );
      }
    } else {
      return responseApi.ErrorResponse(
        res,
        "Please provide a valid get_field",
        ""
      );
    }
  } catch (error) {
    console.log("Error", error);
    return responseApi.ErrorResponse(
      res,
      "error",
      error.message ? error.message : error
    );
  }
};

//Update a Campaign
const update_campaign = async (req, res, next) => {
  try {
    const { campaign_id,params } = req.body;
    const access_token = req.facebook_token;
    const facebook_result = await facebook_update_campaign(campaign_id, params, access_token);
    if (facebook_result.status == "success") {
      return responseApi.successResponseWithData(
        res,
        "create campaign data",
        facebook_result.data,
        StatusCodes.CREATED
      );
    } else {
      return responseApi.ErrorResponse(
        res,
        "unable to create campaign data",
        facebook_result.data,
        StatusCodes.BAD_REQUEST
      );
    }
  } catch (error) {
    console.log("error", error);
    return responseApi.ErrorResponse(
      res,
      "error",
      error.message ? error.message : error
    );
  }
};


module.exports = {
  create_campaign,
  get_Insights,
  create_adSet,
  get_adSet,
  create_creative,
  create_creative_video,
  get_creative,
  create_ad,
  get_account_pages,
  get_location_keys,
  create_creative_video_upload,
  get_page_video,
  get_ads,
  get_page_images,
  create_carousel,
  get_businesses,
  get_account_videos_images,
  update_campaign
};
