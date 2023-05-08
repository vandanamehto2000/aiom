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
  // try {
  let { id, fields, params } = req.body;
  const facebook_result = await facebook_create_campaign(id, fields, params);
  // return next(facebook_result);
  if (facebook_result._data) {
    return next({
      status: StatusCodes.CREATED,
      message: "success",
      data: facebook_result._data,
    });
  } else {
    return next({
      status: StatusCodes.BAD_REQUEST,
      message: "error",
      data: facebook_result.response,
    });
  }
};

//Get a Campaign
const get_campaign = async (req, res, next) => {
  try {
    let { id, fields_array, effective_status_array, access_token } = req.query;
    let fields=fields_array.slice(1,-1).split(",");
    let effective_status =effective_status_array.slice(1,-1).split(",");
    let params = { effective_status: effective_status };
    const campaignss = await facebook_get_campaign(id, fields, params);
    return next({
      status: StatusCodes.OK,
      message: "success",
      data: campaignss,
    });
  } catch (error) {
    console.log("Error Message:" + error);
    console.log("Error Stack:" + error.stack);
    return next({
      status: StatusCodes.BAD_REQUEST,
      message: "error",
      data: error,
    });
  }
};

//Create AdSET
const create_adSet = async (req, res, next) => {
  try {
    let { id, fields, params } = req.body;
    const adsets = await facebook_create_adSet(id, fields, params);
    if (adsets._data) {
      return next({
        status: StatusCodes.CREATED,
        message: "success",
        data: adsets._data,
      });
    } else {
      return next({
        status: StatusCodes.BAD_REQUEST,
        message: "error",
        data: adsets.response,
      });
    }
  } catch (error) {
    console.log("Error Message:" + error);
    console.log("Error Stack:" + error.stack);
    return next({
      status: StatusCodes.BAD_REQUEST,
      message: "error",
      data: error,
    });
  }
};

const get_adSet = async (req, res, next) => {
  try {
    let { id, fields_array, access_token } = req.query;
    let fields = fields_array.slice(1,-1).split(",")
    let params = {};
    const adset_data = await facebook_get_adSet(id, fields, params);
    return next({
      status: StatusCodes.OK,
      message: "Success!!",
      data: adset_data,
    });
  } catch (error) {
    console.log("Error Message: controller" + error);
    console.log("Error Stack:" + error.stack);
    return next({
      status: StatusCodes.BAD_REQUEST,
      message: "error",
      data: error,
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
