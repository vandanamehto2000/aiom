// "use strict";
const bizSdk = require("facebook-nodejs-business-sdk");
const { StatusCodes } = require("http-status-codes");
const AdAccount = bizSdk.AdAccount;
const Campaign = bizSdk.Campaign;
const AdSet = bizSdk.AdSet;
// const Ad = bizSdk.Ad;
const User = bizSdk.User;
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const facebook = require('../models/facebook')

// // global.Token;
// // let obj = {}
// let globalToken;
// const access_details_fun = async()=>{
//   const details = await facebook.find()
//   // console.log(details)
//   return details[0].token
// }

// const handleAccess = async()=>{
// let token = await access_details_fun()
//   globalToken= token
// }



const access_token = "EAARmX2NDin4BAOOOjtVVWzqtCymFzz4rkqatnviWh6TGOmkT5o8ZArstEtv1aaGw8ZA0jPFGFvq65now8vXYTVZAjJb9FgQCbKXlGRXdhIWuCIrZBFEcFh8EPXh3QKPNm5Shh5ZBkZCb8jJWgnDQJZCghlMRL2Ab917jdDskJuyFBXN4Rn7QEQo";
const app_secret = "<APP_SECRET>";
const app_id = "1238459780139646";
const video_access_token =
  "EAARmX2NDin4BAOwg0MNnFsDdcM5dLrvUdEe4YItKySYmjStY96lqvZABbIdDOxg44XXQIuSlZC1MQrXfvOpKHDdVDGDv8efLgE309iE8LBZBYjG7twR4ZC0IrQzIBCy8SrGVynGMb4uWeUjwsIOlGw5bikFEOFAt9ZCghvZAVHmwROaPMZAkuHFjZBJRgUdnGQyuZAcjVGtdp63SJO6AH0sSh";
const pageId = "106284349116205";
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
    if (campaigns._data) {
      return {
        status: "success",
        data: campaigns._data,
      };
    } else {
      return {
        status: "unsuccessfull",
        data: campaigns,
      };
    }
  } catch (error) {
    console.log("error part1", error);
    console.log("Error Message:" + error);
    console.log("Error Stack:" + error.stack);
    return {
      status: "error",
      data: error.message ? error.message : error,
    };
  }
};

//Get a Campaign
const facebook_get_campaign = async (id, fields, params) => {
  try {
    const campaignss = await new AdAccount(id).getCampaigns(fields, params);
    if (campaignss[0]._data) {
      let result = [];
      for (let i = 0; i < campaignss.length; i++) {
        result.push(campaignss[i]._data);
      }
      return {
        status: "success",
        data: result,
      };
    } else {
      return {
        status: "unsuccessfull",
        data: campaignss,
      };
    }
  } catch (error) {
    console.log(error);
    console.log("Error Message:" + error);
    console.log("Error Stack:" + error.stack);
    return {
      status: "error",
      data: error.message ? error.message : error,
    };
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
    if (adsets._data) {
      return {
        status: "success",
        data: adsets._data,
      };
    } else {
      return {
        status: "unsuccessfull",
        data: adsets,
      };
    }
  } catch (error) {
    console.log(error);
    console.log("Error Message:" + error);
    console.log("Error Stack:" + error.stack);
    return {
      status: "error",
      data: error.message ? error.message : error,
    };
  }
};
// facebook_create_adSet()

//Get AdSet
const facebook_get_adSet = async (id, fields, params) => {
  try {
    const adsetss = await new Campaign(id).getAdSets(fields, params);
    if (adsetss[0]._data) {
      let arr = [];
      for (let i = 0; i < adsetss.length; i++) {
        arr.push(adsetss[i]._data);
      }
      return {
        status: "success",
        data: arr,
      };
    } else {
      return {
        status: "unsuccessfull",
        data: adsetss,
      };
    }
  } catch (error) {
    console.log("Error Message:" + error);
    console.log("Error Stack:" + error.stack);
    return {
      status: "error",
      data: error.message ? error.message : error,
    };
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
const facebook_create_creative = async (
  imagePath,
  imageName,
  id,
  fields,
  params
) => {
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
    // let params1  = {
    //   image_hash: "<imageHash>",
    //   object_story_spec: {
    //     page_id: "<pageID>",
    //     link_data: {
    //       image_hash: "<imageHash>",
    //       link: "<canvasURI>",
    //       name: "Creative message",
    //       call_to_action: { type: "LEARN_MORE" },
    //     },
    //   },
    // };

    //Change Params according to the input(image/video)

    let result = await facebook_get_image_hash(imagePath, imageName);
    let { hash, url, name } = result.images[`${imageName}`]

    params.image_hash = hash;
    params.object_story_spec.link_data.link = url;
    params.object_story_spec.link_data.image_hash = hash;
    const adcreatives = await new AdAccount(id).createAdCreative(
      fields,
      params
    );
    logApiCallResult("adcreatives api call complete.", adcreatives);
    if (adcreatives._data) {
      return {
        status: "success",
        data: adcreatives._data,
      };
    } else {
      return {
        status: "unsuccessfull",
        data: adcreatives,
      };
    }
  } catch (error) {
    console.log(error);
    console.log("Error Message:" + error);
    console.log("Error Stack:" + error.stack);
    return {
      status: "error",
      data: error.message ? error.message : error,
    };
  }
};

//get Creative
const facebook_get_creative = async (id, fields, params,page_id) => {
  try {
    const adcreativess = await new AdAccount(id).getAdCreatives(fields, params);
    const video_data = await facebook_get_video(page_id)
    if(video_data.status!=="success"){
      return {
        status:"error",
        data:video_data.data
      }
    }
    if (adcreativess[0]._data) {
      let arr = [];
      for (let i = 0; i < adcreativess.length; i++) {
        arr.push(adcreativess[i]._data);
      }
      return {
        status: "success",
        data: {
         video :video_data.data,
         creatives: arr
        }
      };
    } else {
      return {
        status: "unsuccessfull",
        data: adcreativess,
      };
    }
  } catch (error) {
    console.log(error);
    console.log("Error Message:" + error);
    console.log("Error Stack:" + error.stack);
    return {
      status: "error",
      data: error.message ? error.message : error,
    };
  }
};

//AdSet id - 23853907338140580
//creative id - 23853908495800580
//Create Ad
const facebook_create_ad = async (id, fields, params) => {
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
    return ads;
  } catch (error) {
    console.log("catch error", error);
    console.log("Error Message:" + error);
    console.log("Error Stack:" + error.stack);
    return error;
  }
};

// image HAsh -69b1f27b22e5cbf02f03d5663318604c
// const imagePath =
//   "src/platform/23-inches-display-1920-x-1080-pixels-8-gb-ram-intel-i3-branded-desktop--172.jpg";
const facebook_get_image_hash = async (imagePath, imageName) => {
  try {
    let data = new FormData();
    data.append(imageName, fs.createReadStream(imagePath));
    data.append("access_token", access_token);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://graph.facebook.com/v16.0/act_1239957706633747/adimages",
      headers: {
        ...data.getHeaders(),
      },
      data: data,
    };

    return axios
      .request(config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};

//User account_id - 113796205024659
//GET User account ID
const facebook_get_user_account_id = async () => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://graph.facebook.com/v16.0/me?fields=id,name&access_token=${access_token}`,
      headers: {}
    };

    const response = await axios.request(config)
    if (response.data) {
      return {
        status: "success",
        data: response.data
      }
    } else {
      return {
        status: "error",
        data: response.message ? response.message : response
      }
    }

  } catch (error) {
    return {
      status: "error",
      data: error.message ? error.message : error,
    };
  }
};

//pages related to the user account id
const facebook_get_accounts_pages = async () => {
  try {
    const user_details = await facebook_get_user_account_id()
    if (user_details.status !== "success") {
      return {
        status: "error",
        data: user_details.data
      }
    }
    let fields, params;
    fields = ["id", "name", "description"];
    params = {};
    const accountss = await new User(user_details.data.id).getAccounts(
      fields,
      params
    ); //Id here is account_id(NOT AD_ACCOUNT_ID)
    if (accountss[0]._data) {
      let arr = [];
      for (let i = 0; i < accountss.length; i++) {
        arr.push(accountss[i]._data);
      }
      return {
        status: "success",
        data: arr,
      };
    } else {
      return {
        status: "unsuccessfull",
        data: accountss,
      };
    }

    // logApiCallResult("accountss api call complete.", accountss);
  } catch (error) {
    return {
      status: "error",
      data: error.message ? error.message : error,
    };
  }
};

const facebook_generate_previews = async () => {
  let fields, params;
  fields = [];
  // params = {
  //   creative: "<adCreativeSpec>",
  //   ad_format: "<adFormat>",
  // };
  params = {
    creative: { object_story_id: "<pageID>_<postID>" },
    ad_format: "DESKTOP_FEED_STANDARD",
  };
  const generatepreviewss = new AdAccount(id).getGeneratePreviews(
    fields,
    params
  );
  logApiCallResult("generatepreviewss api call complete.", generatepreviewss);
};

const facebook_get_location = async (params) => {
  try {
    const url = "https://graph.facebook.com/v16.0/search";
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${url}?location_types=${params.location_types}&type=${params.type}&q=${params.q}&limit=1000&access_token=${access_token}`,
      headers: {},
    };

    const result = await axios.request(config);

    if (result.data) {
      return {
        status: "success",
        data: result.data,
      };
    } else {
      return {
        status: "error",
        data: result.message ? result.message : result,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      data: error.message ? error.message : error,
    };
  }
};
// facebook_get_location()

const facebook_get_interest = async () => {
  try {
    let params = {
      type: "adinterest",
      q: "cricket",
    };
    const url = "https://graph.facebook.com/v16.0/search";

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${url}?type=${params.type}&q=${params.q}&access_token=${access_token}`,
      headers: {},
    };
    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error)
  }
};

const facebook_get_demographics = async () => {
  try {
    let params = {
      type: "adeducationschool",
      q: "DELHi",
    };
    const url = "https://graph.facebook.com/v16.0/search";

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${url}?type=${params.type}&q=${params.q}&access_token=${access_token}`,
      headers: {},
    };
    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error)
  }
};

const facebook_get_video = async (id) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://graph.facebook.com/v16.0/${id}/videos?fields=thumbnails&access_token=${access_token}`, // id here is page-ID (not ad_account_ID)
    headers: { }
  };
  
  const video_data = await axios.request(config)
  if (video_data.data) {
    let arr = [];
    for (let i = 0; i < video_data.data.data.length; i++) {
      arr.push(video_data.data.data[i]);
    }
    return {
      status: "success",
      data: arr,
    };
  } else {
    return {
      status: "unsuccessfull",
      data: video_data,
    };
  }
}

// facebook_get_video(106284349116205)


const logApiCallResult = (apiCallName, data) => {
  //   console.log(apiCallName);
  if (showDebugingInfo) {
    // fs.writeFile('src/platform/test.js',`${data}`,(err)=>{
    //   console.log(err)
    // })
    console.log("Data:" + JSON.stringify(data));
  }
};

const facebook_get_video_id = async (
  thumbPath,thumbFieldname,thumbFileName,videoPath,sourceFieldname,id, fields, params
) => {
  try {
    let data = new FormData();
    data.append("access_token", video_access_token);
    data.append(sourceFieldname, fs.createReadStream(videoPath));
    data.append(thumbFieldname, fs.createReadStream(thumbPath));
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `https://graph-video.facebook.com/v16.0/${pageId}/videos`,
      headers: {
        ...data.getHeaders(),
      },
      data: data,
    };
    return axios
      .request(config)
      .then((response) => {
        return {
          status: "success",
          data: response.data.id,
        };
      })
      .catch((error) => {
        return {
          status: "unsuccessfull",
          data: error,
        };
      });
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      data: error.message ? error.message : error,
    };
  }
};

const facebook_create_creative_video = async (
  thumbPath,
  thumbFieldname,
  thumbFileName,
  videoPath,
  sourceFieldname,
  id,
  fields,
  params
) => {
  try {
    let fields;
    fields = [];
    let result = await facebook_get_video_id(
      thumbPath,
      thumbFieldname,
      thumbFileName,
      videoPath,
      sourceFieldname,
      id,
      fields,
      params
    );
    console.log("====================result",result)
    let video_id = result.data;
    let imageURL = "https://scontent.fdel27-4.fna.fbcdn.net/v/t15.5256-10/343759621_289413966748240_3223617081243889490_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=f2c4d5&_nc_ohc=2fkFOpkHZhQAX_7L_cK&_nc_ht=scontent.fdel27-4.fna&edm=AGz5Y0wEAAAA&oh=00_AfBJ0Vr23YXTdnbm1AOazdrNWEvN-EXFdwYLRRAFviBz2w&oe=6469D403";
    //params = {"name":"Sample Creative video1","object_story_spec":{"page_id":"106284349116205","video_data":{"image_url":"","video_id":"","call_to_action":{"type":"LIKE_PAGE","value":{"page":"106284349116205"} },},},}
    // params.image_hash = hash;
    // params.object_story_spec.link_data.link = url;
    // params.object_story_spec.link_data.image_hash = hash;
    params.object_story_spec.video_data.image_url=imageURL;
    params.object_story_spec.video_data.video_id=video_id;
    console.log("params--------platform",params)
    const adcreatives = await new AdAccount(id).createAdCreative(
      fields,
      params
    );
    logApiCallResult("adcreatives api call complete.", adcreatives);
    if (adcreatives._data) {
      return {
        status: "success",
        data: adcreatives._data.id,
      };
    } else {
      return {
        status: "unsuccessfull",
        data: adcreatives,
      };
    }
  } catch (error) {
    console.log(error);
    console.log("Error Message:" + error);
    console.log("Error Stack:" + error.stack);
    return {
      status: "error",
      data: error.message ? error.message : error,
    };
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
  facebook_get_user_account_id,
  facebook_get_accounts_pages,
  facebook_get_location,
  facebook_create_creative_video,
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
