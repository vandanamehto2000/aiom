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
    // console.log("success part2",facebook_result)
    return next(facebook_result);
};

//Get a Campaign
const get_campaign = async (req, res, next) => {
  try {
    let { id,fields_array,effective_status_array, access_token } = req.query;
    // console.log("00000000000000000000", req.query);
    let fields1 = fields_array.split(",");
    let effective_status1 = effective_status_array.split(",");

    //   let {id,fields,params,access_token} = data
    console.log("fields_array--",fields_array,"effective_status_array--",effective_status_array)
    let fields=[];
    // fields = [
    //   "name",
    //   "start_time",
    //   "end_time",
    //   "daily_budget",
    //   "lifetime_budget",
    //   "buying_type",
    // ];
    // params = {
    //   effective_status: ["ACTIVE", "PAUSED"],
    // };
     let effective_status = [];
    for (let i = 0; i < fields1.length; i++) {
      fields.push(fields1[i]);
    }
    for (let i = 0; i < effective_status1.length; i++) {
      effective_status.push(effective_status1[i]);
    }
    let params = { effective_status:effective_status};
    console.log("fields+++++++++++",fields)
    console.log("params+++++++++",params)

    const campaignss = await facebook_get_campaign(id, fields, params);
    return next({
      status: StatusCodes.OK,
      message: "success",
      data: campaignss,
    });
  } catch (error) {
    console.log(error);
    console.log("Error Message:+++++++++++++++" + error);
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
    // let fields, params;
    // fields = [];
    // params = {
    //   name: "My First AdSet",
    //   lifetime_budget: "41300",
    //   // daily_budget:"9000",
    //   start_time: "2023-04-26T09:24:18-0700",
    //   end_time: "2023-05-01T09:24:18-0700",
    //   campaign_id: "23853832660620580",
    //   bid_amount: "80",
    //   billing_event: "IMPRESSIONS",
    //   optimization_goal: "POST_ENGAGEMENT",
    //   targeting: {
    //     age_min: 20,
    //     age_max: 24,
    //     behaviors: [{ id: 6002714895372, name: "All travelers" }],
    //     genders: [1],
    //     geo_locations: {
    //       countries: ["US"],
    //       regions: [{ key: "4081" }],
    //       cities: [{ key: "777934", radius: 10, distance_unit: "mile" }],
    //     },
    //     // promoted_object : {page_id:'106284349116205',object_store_url:'https://sveltetech.com/'},
    //     // interests: [{ id: "<adsInterestID>", name: "<adsInterestName>" }],
    //     life_events: [{ id: 6002714398172, name: "Newlywed (1 year)" }],
    //     facebook_positions: ["feed"],
    //     publisher_platforms: ["facebook", "audience_network"],
    //   },
    //   status: "PAUSED",
    // };

    // params = {
    //   name: "My AdSet",
    //   optimization_goal: "AD_RECALL_LIFT",
    //   billing_event: "IMPRESSIONS",
    //   bid_strategy: "LOWEST_COST_WITHOUT_CAP",
    //   // autobid:"true",
    //   // bid_amount: "2",
    //   // bid_cap:"10",
    //   daily_budget: "50000",
    //   campaign_id: "23853906349450580",
    //   targeting: {
    //     facebook_positions: ["feed"],
    //     geo_locations: { countries: ["IN"] },
    //     behaviors: [
    //       // { id: 6007101597783, name: "Business Travelers" },
    //       { id: 6004386044572, name: "Android Owners (All)" },
    //     ],
    //   },
    // };

    const adsets = await facebook_create_adSet(id, fields, params);
    // console.log(adsets.status, "--------------");
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
