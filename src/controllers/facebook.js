"use strict";
const {
  facebook_create_campaign,
  facebook_get_campaign,
  facebook_create_adSet,
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
    if(facebook_result._data){
      return next({
        status: StatusCodes.CREATED,
        message: "success",
        data: facebook_result._data,
      });
    }else{
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
    let { id,fields_array,effective_status_array, access_token } = req.query;
    let fields1 = fields_array.split(",");
    let effective_status1 = effective_status_array.split(",");
    let fields=[];
     let effective_status = [];
    for (let i = 0; i < fields1.length; i++) {
      fields.push(fields1[i]);
    }
    for (let i = 0; i < effective_status1.length; i++) {
      effective_status.push(effective_status1[i]);
    }
    let params = { effective_status:effective_status};

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
    if(adsets._data){
      return next({
        status: StatusCodes.CREATED,
        message: "success",
        data: adsets,
      });
    }else{
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
  create_creative,
  create_ad,
};
