"use strict";
const bizSdk = require("facebook-nodejs-business-sdk");
const { StatusCodes } = require("http-status-codes");
const AdAccount = bizSdk.AdAccount;
const Campaign = bizSdk.Campaign;
const AdSet = bizSdk.AdSet;
// const Ad = bizSdk.Ad;
const { curly } = require("node-libcurl");
const access_token =
  "EAARmX2NDin4BAOOOjtVVWzqtCymFzz4rkqatnviWh6TGOmkT5o8ZArstEtv1aaGw8ZA0jPFGFvq65now8vXYTVZAjJb9FgQCbKXlGRXdhIWuCIrZBFEcFh8EPXh3QKPNm5Shh5ZBkZCb8jJWgnDQJZCghlMRL2Ab917jdDskJuyFBXN4Rn7QEQo";
const app_secret = "<APP_SECRET>";
const app_id = "1238459780139646";

const id = "act_1239957706633747"; //local
const api = bizSdk.FacebookAdsApi.init(access_token);
const showDebugingInfo = true; // Setting this to true shows more debugging info.
if (showDebugingInfo) {
  api.setDebug(true);
}

//Create a Campaign
const facebook_create_campaign = async (id, fields, params) => {
  try {
    const campaigns = await new AdAccount(id).createCampaign(fields, params);
    return campaigns;
  } catch (error) {
    console.log("error part1",error);
    console.log("Error Message:" + error);
    console.log("Error Stack:" + error.stack);
  return error
  }
};

//Get a Campaign
const facebook_get_campaign = async (id, fields, params) => {
  console.log("get++++++:::::::::", id, fields, params);
  try {
    // let fields1, params1;
    // fields1 = [
    //   "name",
    //   "start_time",
    //   "end_time",
    //   "daily_budget",
    //   "lifetime_budget",
    //   "buying_type",
    // ];
    // let params1 = {
    //   effective_status: ["ACTIVE", "PAUSED"],
    // };
    const campaignss = await new AdAccount(id).getCampaigns(fields, params);
    logApiCallResult("campaignss api call complete.", campaignss);
    const result = campaignss.map((item) => {
      return item._data;
    });
    return result;
  } catch (error) {
    console.log(error);
    console.log("Error Message:-----------" + error);
    console.log("Error Stack:" + error.stack);
    return error;
  }
};

// facebook_get_campaign()
//Brand_Awareness campaign ID - 23853906349450580
//"23853823531720580",  //conversions campaign ID

//Create AdSET
const facebook_create_adSet = async (id, fields, params) => {
  try {
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

    const adsets = await new AdAccount(id).createAdSet(fields, params);
    return adsets._data;
  } catch (error) {
    console.log(error);
    console.log("Error Message:" + error);
    console.log("Error Stack:" + error.stack);
    return error;
  }
};

//Get AdSet
const facebook_get_adSet = async (id, fields,params) => {
  try {
    let fields, params;
    fields = [
      "name",
      "start_time",
      "end_time",
      "daily_budget",
      "lifetime_budget",
    ];
    params = {
      effective_status: [
        "ACTIVE",
        "PAUSED",
        "ARCHIVED",
        "IN_PROCESS",
        "WITH_ISSUES",
      ],
    };
    const adsetss = await new Campaign(id).getAdSets(
      fields,
      params
    );

    console.log(adsetss, "---------");
    logApiCallResult("adsetss api call complete.", adsetss);
  } catch (error) {
    console.log(error);
    console.log("Error Message:" + error);
    console.log("Error Stack:" + error.stack);
    return error;
  }
};

//Get Ad
const facebook_get_ad = async () => {
  try {
    let fields, params;
    fields = [
      "impressions",
      "account_currency",
      "account_id",
      "account_name",
      "action_values",
      "actions",
      "ad_bid_value",
      "ad_click_actions",
      "ad_id",
      "ad_impression_actions",
      "ad_name",
      "adset_bid_value",
      "adset_end",
      "adset_id",
      "adset_name",
      "adset_start",
      "age_targeting",
      "attribution_setting",
      "auction_bid",
    ];
    params = {
      breakdown: "publisher_platform",
    };
    const insightss = await new AdSet("23853878290130580").getInsights(
      fields,
      params
    );
    console.log(insightss);
    logApiCallResult("insightss api call complete.", insightss);
  } catch (error) {
    console.log(error);
    console.log("Error Message:" + error);
    console.log("Error Stack:" + error.stack);
  }
};

//page ID -106284349116205
//Create creative
const facebook_create_creative = async (id,fields,params) => {
  try {
    // let fields, params;
    // fields = [];
    // params = {
    //   // 'object_story_id' : '106284349116205_113796205024659',

    //   name: "Sample Creative",
    //   object_story_spec: {
    //     page_id: "106284349116205",
    //     link_data: {
    //       link: "https://facebook.com/106284349116205",
    //       message: "try it out",
    //     },
    //   },
    // };
    const adcreatives = await new AdAccount(id).createAdCreative(
      fields,
      params
    );
    logApiCallResult("adcreatives api call complete.", adcreatives);
    return adcreatives;
  } catch (error) {
    console.log(error);
    console.log("Error Message:" + error);
    console.log("Error Stack:" + error.stack);
    return error
  }
};

//get Creative
const facebook_get_creative = async () => {
  try {
    let fields, params;
    fields = ["name", "status", "object_id"];
    params = {};
    const adcreativess = await new AdAccount(id).getAdCreatives(fields, params);
    logApiCallResult("adcreativess api call complete.", adcreativess);
  } catch (error) {
    console.log(error);
    console.log("Error Message:" + error);
    console.log("Error Stack:" + error.stack);
  }
};

//AdSet id - 23853907338140580
//creative id - 23853908495800580
//Create Ad
const facebook_create_ad = async (id,fields,params) => {
  try {
    let fields, params;
    fields = [];
    params = {
      name: "My Ad 1",
      adset_id: "23853907338140580",
      creative: { creative_id: "23853908495800580" },
      status: "PAUSED",
    };
    const ads = await new AdAccount(id).createAd(fields, params);
    console.log(ads);
    logApiCallResult("ads api call complete.", ads);
    return ads
  } catch (error) {
    console.log("catch error",error);
    console.log("Error Message:" + error);
    console.log("Error Stack:" + error.stack);
    return error
  }
};

const imagePath =
  "src/platform/23-inches-display-1920-x-1080-pixels-8-gb-ram-intel-i3-branded-desktop--172.jpg";
const facebook_get_image_hash = async () => {
  try {
    const url = `https://graph.facebook.com/v2.11/act_${id}/adimages`;

    const { statusCode, data } = await curly.post(url, {
      postFields: JSON.stringify({
        filename: imagePath,
        access_token: access_token,
      }),
      httpHeader: [
        "Content-Type: application/json",
        "Accept: application/json",
      ],
    });

    // console.log(data,statusCode,"------------")
    //     const headers = ['Content-Type: multipart/form-data'];
    //     const formData = [
    //       {
    //         name: 'access_token',
    //         contents: access_token
    //       },
    //       {
    //         name: 'filename',
    //         file: imagePath,
    //         type: 'image/jpeg'
    //       }
    //     ];
    //     curly.post(
    //       url,
    //       {
    //   headers: headers,
    //   multipartFormData: formData
    // },
    //       function (err, response, body) {
    //         if (err) {
    //           console.error(err);
    //         } else {
    //           console.log(body);
    //         }
    //       }
    //     ).setOpt('VERBOSE', true)
    //     .setOpt('SSL_VERIFYPEER', false)
    //     .setOpt('HTTPHEADER', headers)
    //     .setOpt('HTTPPOST', formData);
  } catch (error) {
    console.log(error);
  }
};

const logApiCallResult = (apiCallName, data) => {
  //   console.log(apiCallName);
  if (showDebugingInfo) {
    // fs.writeFile('src/platform/test.js',`${data}`,(err)=>{
    //   console.log(err)
    // })
    console.log("Data:" + JSON.stringify(data));
  }
};

module.exports = {
  facebook_create_campaign,
  facebook_get_campaign,
  facebook_create_adSet,
  facebook_get_adSet,
  facebook_get_ad,
  facebook_create_ad,
  facebook_get_creative,
  facebook_create_creative,
};

// facebook_create_campaign()
// facebook_get_campaign()
// facebook_create_adSet()
// facebook_get_adSet()
// facebook_get_ad()
// facebook_create_ad()
// facebook_get_creative()
// facebook_create_creative()
// facebook_get_image_hash()
