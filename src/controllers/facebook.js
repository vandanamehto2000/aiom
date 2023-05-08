"use strict";
const {
  facebook_create_campaign,
  facebook_get_campaign,
  facebook_create_adSet,
  facebook_get_adSet,
  facebook_create_creative,
  facebook_create_ad,
} = require("../platform/facebook");
const { StatusCodes } = require("http-status-codes");
//Create a Campaign
const create_campaign = async (req, res, next) => {
  try {
    let { id, fields, params } = req.body;
    const facebook_result = await facebook_create_campaign(id, fields, params);
    if (facebook_result.status == "success") {
      return next({
        status: StatusCodes.CREATED,
        message: "success",
        data: facebook_result.data,
      });
    } else {
      return next({
        status: StatusCodes.BAD_REQUEST,
        message: "error",
        data: facebook_result.data,
      });
    }
  } catch (error) {
    return next({
      status: StatusCodes.BAD_REQUEST,
      message: "error",
      data: error.message ? error.message : error,
    });
  }
};

//Get a Campaign
const get_campaign = async (req, res, next) => {
  try {
    let { id, fields_array, params } = req.query;
    fields_array = JSON.parse(fields_array);
    params = JSON.parse(params);
    const campaignss = await facebook_get_campaign(id, fields_array, params);
    if (campaignss.status == "success") {
      return next({
        status: StatusCodes.OK,
        message: "success",
        data: campaignss.data,
      });
    } else {
      return next({
        status: StatusCodes.BAD_REQUEST,
        message: "error",
        data: campaignss.data,
      });
    }
  } catch (error) {
    console.log("Error Message:" + error);
    console.log("Error Stack:" + error.stack);
    return next({
      status: StatusCodes.BAD_REQUEST,
      message: "error",
      data: error.message ? error.message : error,
    });
  }
};

//Create AdSET
const create_adSet = async (req, res, next) => {
  try {
    let { id, fields, params } = req.body;
    const adsets = await facebook_create_adSet(id, fields, params);
    if (adsets.status === "success") {
      return next({
        status: StatusCodes.CREATED,
        message: "success",
        data: adsets.data,
      });
    } else {
      return next({
        status: StatusCodes.BAD_REQUEST,
        message: "error",
        data: adsets.data,
      });
    }
  } catch (error) {
    console.log("Error Message:" + error);
    console.log("Error Stack:" + error.stack);
    return next({
      status: StatusCodes.BAD_REQUEST,
      message: "error",
      data: error.message ? error.message : error,
    });
  }
};

const get_adSet = async (req, res, next) => {
  try {
    let { id, fields_array } = req.query;
    let fields = JSON.parse(fields_array)
    let params = {};
    const adset_data = await facebook_get_adSet(id, fields, params);
    if (adset_data.status == "success") {
      return next({
        status: StatusCodes.OK,
        message: "success",
        data: adset_data.data,
      });
    } else {
      return next({
        status: StatusCodes.BAD_REQUEST,
        message: "error",
        data: adset_data.data,
      });
    }
  } catch (error) {
    console.log("Error Message: controller" + error);
    console.log("Error Stack:" + error.stack);
    return next({
      status: StatusCodes.BAD_REQUEST,
      message: "error",
      data:error.message ? error.message : error,
    });
  }
};

//Create creative
const create_creative = async (req, res, next) => {
  try {
    let { id, fields, params } = req.body;
    const adcreatives = await facebook_create_creative(id, fields, params);
    return next({
      status: StatusCodes.CREATED,
      message: "success",
      data: adcreatives,
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
module.exports = {
  create_campaign,
  get_campaign,
  create_adSet,
  get_adSet,
  create_creative,
  create_ad,
};
