// "use strict";
const bizSdk = require("facebook-nodejs-business-sdk");
const { StatusCodes } = require("http-status-codes");
const AdAccount = bizSdk.AdAccount;
const Campaign = bizSdk.Campaign;
const AdSet = bizSdk.AdSet;
const Ad = bizSdk.Ad;
// const Ad = bizSdk.Ad;
const User = bizSdk.User;
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const fields_constant = require("../utils/constant");
const Page = bizSdk.Page;

const facebook_url = process.env.FACEBOOK_URL;
const path = require("path");
const { createWriteStream } = require("fs");
const { promisify } = require("util");
const streamPipeline = promisify(require("stream").pipeline);

// const access_token = "EAARmX2NDin4BAFX6rkDokk5zcMxI2AJsBnmuRNaziBYvG0WfDFZCeYIwqsCef3RCAFvV2anQWcP74G9ZB2LyH574WE0HbSRSx9ITBdhZAwjGtftgI17bhP05cinMsJ8VZCQZBRPdmqwT4VsApzgMZAZCRFxMrBYe32n3ioKiCUa6Tnd8lR8RwZCslAbh3ZBsF9HFPh4ZCgR3HOQQZDZD"
// const app_secret = "<APP_SECRET>";

// const app_id = "1238459780139646";
// const pageId = "106284349116205";
// const id = "act_1239957706633747"; //local
// const api = bizSdk.FacebookAdsApi.init(access_token);

//Create a Campaign
const facebook_create_campaign = async (id, fields, params) => {
  try {
    if (params.daily_budget) {
      params.daily_budget *= 100;
    }
    if (params.lifetime_budget) {
      params.lifetime_budget *= 100;
    }
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
const facebook_get_Insights = async (
  object_id,
  fields,
  level,
  access_token,
  params
) => {
  try {

    params.limit = 100000
    let fields1 = fields_constant.fields[5]
   
    let fields2 = fields_constant.fields[2]

    let fields3 = fields_constant.fields[3]

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${facebook_url}/${object_id}/insights?level=${level}&fields=${fields}&limit=100000&access_token=${access_token}`,
      headers: {},
    };

    const result = await axios.request(config);
    if (!result.data) {
      return {
        status: "unable to get data in result",
        data: result.message ? result.message : result,
      };
    }

    let result1 = [];

    if (level == "campaign") {
      const campaigns_data = await new AdAccount(object_id).getCampaigns(
        fields1,
        params
      );

      if (campaigns_data.length > 0) {
        for (let i = 0; i < campaigns_data.length; i++) {
          if (campaigns_data[i]._data.daily_budget) {
            campaigns_data[i]._data.daily_budget =
              campaigns_data[i]._data.daily_budget / 100;
          } else if (campaigns_data[i]._data.lifetime_budget) {
            campaigns_data[i]._data.lifetime_budget =
              campaigns_data[i]._data.lifetime_budget / 100;
          }
          result1.push(campaigns_data[i]._data);
        }
      }
    } else if (level == "adset") {
      params = {
        limit: 100000,
      };
      const adsetset_data = await new Campaign(object_id).getAdSets(
        fields2,
        {}
      );

      if (adsetset_data.length > 0) {
        for (let j = 0; j < adsetset_data.length; j++) {
          if (adsetset_data[j]._data.daily_budget) {
            adsetset_data[j]._data.daily_budget =
              adsetset_data[j]._data.daily_budget / 100;
          } else if (adsetset_data[j]._data.lifetime_budget) {
            adsetset_data[j]._data.lifetime_budget =
              adsetset_data[j]._data.lifetime_budget / 100;
          }
          result1.push(adsetset_data[j]._data);
        }
      }
    } else if (level == "ad") {
      params = {
        limit: 100000,
      };
      const ad_data = await new AdSet(object_id).getAds(fields3, params);

      if (ad_data.length > 0) {
        for (let k = 0; k < ad_data.length; k++) {
          if (ad_data[k]._data.daily_budget) {
            ad_data[k]._data.daily_budget = ad_data[k]._data.daily_budget / 100;
          } else if (ad_data[k]._data.lifetime_budget) {
            ad_data[k]._data.lifetime_budget =
              ad_data[k]._data.lifetime_budget / 100;
          }
          result1.push(ad_data[k]._data);
        }
      }
    }

    const mergedArr = [];
    for (let i = 0; i < result.data.data.length; i++) {
      const obj = result.data.data[i]; //insights data

      if ((matchingObj = result1.find((item) => item.id === obj.campaign_id))) {
        //campaign data
        mergedArr.push(matchingObj ? { ...obj, ...matchingObj } : obj);
      } else if (
        (matchingObj = result1.find((item) => item.adset_id === obj.id))
      ) {
        //adset data
        mergedArr.push(matchingObj ? { ...obj, ...matchingObj } : obj);
      } else if (
        (matchingObj = result1.find((item) => item.id === obj.ad_id))
      ) {
        //ad_data
        mergedArr.push(matchingObj ? { ...obj, ...matchingObj } : obj);
      }
    }

    if (mergedArr) {
      return {
        status: "success",
        data: mergedArr,
      };
    } else {
      return {
        status: "unable to get merge data",
        data: mergedArr.message ? mergedArr.message : mergedArr,
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

//Create AdSET
const facebook_create_adSet = async (id, fields, params) => {
  try {
    if (params.daily_budget) {
      params.daily_budget *= 100;
    }
    if (params.lifetime_budget) {
      params.lifetime_budget *= 100;
    }
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
    params.limit = 100000;
    const adsetss = await new Campaign(id).getAdSets(fields, params);
    if (adsetss.length > 0) {
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
    } else {
      return {
        status: "success",
        data: [],
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
const facebook_get_ads = async (id, fields, params) => {
  try {
    params.limit = 100000;
    const insightss = await new AdSet(id).getAds(
      //id here is AdSet_id
      fields,
      params
    );
    if (insightss.length > 0) {
      if (insightss[0]._data) {
        let arr = [];
        for (let i = 0; i < insightss.length; i++) {
          arr.push(insightss[i]._data);
        }
        return {
          status: "success",
          data: arr,
        };
      } else {
        return {
          status: "unsuccessfull",
          data: insightss,
        };
      }
    } else {
      return {
        status: "success",
        data: [],
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

//Create creative
const facebook_create_creative = async (
  imagePath,
  imageName,
  id,
  fields,
  params,
  access_token
) => {
  try {
    let adcreatives;
    // Create creative through object_story_id
    if (imagePath == null && imageName == null && "object_story_id" in params) {
      adcreatives = await new AdAccount(id).createAdCreative(fields, params);
    } else {
      // Create creative through hash_image and link
      if (params.image_hash !== "") {
        adcreatives = await new AdAccount(id).createAdCreative(fields, params);
      } else {
        console.log("pass data", imagePath, imageName, access_token);
        let result = await facebook_get_image_hash(
          imagePath,
          imageName,
          access_token
        );
        let { hash, url, name } = result.data.images[`${imageName}`];
        params.image_hash = hash;
        params.object_story_spec.link_data.link = url;
        params.object_story_spec.link_data.image_hash = hash;
        adcreatives = await new AdAccount(id).createAdCreative(fields, params);
      }
    }
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
const facebook_get_creative = async (
  id,
  fields,
  params,
  page_id,
  access_token
) => {
  try {
    const adcreativess = await new AdAccount(id).getAdCreatives(fields, params);
    const video_data = await facebook_get_video(page_id, access_token);
    if (video_data.status !== "success") {
      return {
        status: "error",
        data: video_data.data,
      };
    }
    if (adcreativess[0]._data) {
      let arr = [];
      for (let i = 0; i < adcreativess.length; i++) {
        arr.push(adcreativess[i]._data);
      }
      return {
        status: "success",
        data: {
          video: video_data.data,
          creatives: arr,
        },
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

//Create Ad
const facebook_create_ad = async (id, fields, params) => {
  try {
    const ads = await new AdAccount(id).createAd(fields, params);
    if (ads._data) {
      return {
        status: "success",
        data: ads._data,
      };
    } else {
      return {
        status: "unsuccessfull",
        data: ads,
      };
    }
  } catch (error) {
    console.log("catch error", error);
    console.log("Error Message:" + error);
    console.log("Error Stack:" + error.stack);
    return {
      status: "error",
      data: error.message ? error.message : error,
    };
  }
};

const facebook_get_image_hash = async (imagePath, imageName, access_token) => {
  try {
    let data = new FormData();
    data.append(imageName, fs.createReadStream(imagePath));
    data.append("access_token", access_token);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${facebook_url}/act_1239957706633747/adimages`,
      headers: {
        ...data.getHeaders(),
      },
      data: data,
    };
    const response = await axios.request(config);
    console.log("000000000000000",response)
    if (response.data) {
      return {
        status: "success",
        data: response.data,
      };
    } else {
      return {
        status: "error",
        data: response.message ? response.message : response,
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

//GET User account ID
const facebook_get_user_account_id = async (access_token) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${facebook_url}/me?fields=id,name&access_token=${access_token}`,
      headers: {},
    };

    const response = await axios.request(config);
    if (response.data) {
      return {
        status: "success",
        data: response.data,
      };
    } else {
      return {
        status: "error",
        data: response.message ? response.message : response,
      };
    }
  } catch (error) {
    return {
      status: "error",
      data: error.message ? error.message : error,
    };
  }
};

//pages related to the user account id
const facebook_get_accounts_pages = async (access_token) => {
  try {
    const user_details = await facebook_get_user_account_id(access_token);
    if (user_details.status !== "success") {
      return {
        status: "error",
        data: user_details.data,
      };
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

const facebook_get_location = async (params, access_token) => {
  try {
    const url = `${facebook_url}/search`;
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

// Get video data from page_id
const facebook_get_video = async (id, access_token, video_id = null) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${facebook_url}/${id}/videos?fields=id,source,updated_time,views,description,title,length,thumbnails&limit=1000&access_token=${access_token}`, // id here is page-ID (not ad_account_ID)
      headers: {},
    };
    let video_data = await axios.request(config);
    if (video_data && video_data.data) {
      if (video_id == null) {
        let arr = [];
        for (let i = 0; i < video_data.data.data.length; i++) {
          arr.push(video_data.data.data[i]);
        }
        return {
          status: "success",
          data: arr,
        };
      } else {
        // video data of only 1 video
        let arr = [];
        for (let i = 0; i < video_data.data.data.length; i++) {
          if (video_data.data.data[i].id == video_id) {
            arr.push(video_data.data.data[i]);
          }
        }
        return {
          status: "success",
          data: arr,
        };
      }
    } else {
      return {
        status: "unsuccessfull",
        data: video_data,
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

const facebook_get_images = async (id) => {
  try {
    let fields = ["id", "link", "name"];
    let params = {};
    const photoss = await new Page(id).getPhotos(fields, params);
    if (photoss[0]._data) {
      let result = [];
      for (let i = 0; i < photoss.length; i++) {
        result.push(photoss[i]._data);
      }
      console.log(result);
      return {
        status: "success",
        data: result,
      };
    } else {
      return {
        status: "unsuccessfull",
        data: photoss,
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

// const logApiCallResult = (apiCallName, data) => {
//   //   console.log(apiCallName);
//   if (showDebugingInfo) {
//     // fs.writeFile('src/platform/test.js',`${data}`,(err)=>{
//     //   console.log(err)
//     // })
//     console.log("Data:" + JSON.stringify(data));
//   }
// };

const facebook_get_page_access_token = async (
  user_id,
  page_id,
  access_token
) => {
  try {
    page_id;
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${facebook_url}/${user_id}/accounts?access_token=${access_token}`,
      headers: {},
    };

    let page_token = await axios.request(config);
    let page_access_token;
    for (let i = 0; i < page_token.data.data.length; i++) {
      if (page_token.data.data[i].id === page_id) {
        page_access_token = page_token.data.data[i].access_token;
      }
    }
    if (page_access_token) {
      return {
        status: "success",
        data: page_access_token,
      };
    } else {
      return {
        status: "error",
        data: "Unable to find associated pages ",
      };
    }
  } catch (error) {
    return {
      status: "error",
      data: error.message ? error.message : error,
    };
  }
};

const facebook_get_video_id = async (
  thumbPath,
  thumbFieldname,
  thumbFileName,
  videoPath,
  sourceFieldname,
  id,
  fields,
  params,
  page_id,
  access_token
) => {
  try {
    let user_id_details = await facebook_get_user_account_id(access_token);
    if (user_id_details.status !== "success") {
      return {
        status: user_id_details.status,
        data: user_id_details.data,
      };
    }
    let page_access_token = await facebook_get_page_access_token(
      user_id_details.data.id,
      page_id,
      access_token
    );
    if (page_access_token.status !== "success") {
      return {
        status: page_access_token.status,
        data: page_access_token.data,
      };
    }
    let data = new FormData();
    data.append("access_token", page_access_token.data);
    if (thumbFieldname) {
      data.append(sourceFieldname, fs.createReadStream(videoPath));
      data.append(thumbFieldname, fs.createReadStream(thumbPath));
    } else {
      data.append(sourceFieldname, fs.createReadStream(videoPath));
    }

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `https://graph-video.facebook.com/v16.0/${page_id}/videos`,
      headers: {
        ...data.getHeaders(),
      },
      data: data,
    };
    const response = await axios.request(config);
    if (response.data) {
      return {
        status: "success",
        data: response.data.id,
      };
    } else {
      return {
        status: "error",
        data: response.message ? response.message : response,
      };
    }
    // return await axios
    //   .request(config)
    //   .then((response) => {
    //     return {
    //       status: "success",
    //       data: response.data.id,
    //     };
    //   })
    //   .catch((error) => {
    //     return {
    //       status: "unsuccessfull",
    //       data: error,
    //     };
    //   });
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      data: error.message ? error.message : error,
    };
  }
};

const facebook_create_creative_video_upload = async (
  thumbPath,
  thumbFieldname,
  thumbFileName,
  videoPath,
  sourceFieldname,
  id,
  fields,
  params,
  page_id,
  access_token
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
      params,
      page_id,
      access_token
    );
    if (result.status == "success") {
      return {
        status: "success",
        data: result.data,
      };
    } else {
      return {
        status: "error",
        data: result.data,
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

// after uploading video
const facebook_create_creative_video = async (id, fields, params) => {
  try {
    const adcreatives = await new AdAccount(id).createAdCreative(
      fields,
      params
    );
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
    return {
      status: "error",
      data: error.message ? error.message : error,
    };
  }
};

const facebook_get_interest_behavior = async () => {
  try {
    let params = {
      type: "adTargetingCategory",
      class: "behaviors",
    };
    console.log(params, "params");
    const url = `${facebook_url}/search`;

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${url}?type=${params.type}&q=${params.q}&access_token=${access_token}`,
      headers: {},
    };
    const behavior = await axios.request(config);
    // console.log(behavior.data, "pppppppp")

    fs.writeFileSync("behavior.txt", JSON.stringify(behavior.data));
    return {
      status: "unsuccessfull",
      data: behavior.data,
    };

    // let readData = fs.readFileSync("behavior.txt");
    // readData = JSON.parse(readData);
    // console.log(readData)
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
// facebook_get_interest_behavior()

const creat_image_carousel = async (
  id,
  name,
  object_story_spec,
  access_token
) => {
  let data = new FormData();
  data.append("name", name);
  data.append("object story spec", JSON.stringify(object_story_spec));
  data.append("access_token", access_token);
  data.append('degrees_of_freedom_spec', '{"creative_features_spec": {"standard_enhancements": {"enroll_status": "OPT_OUT"}}}');

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${facebook_url}/${id}/adcreatives`,
    headers: {
      ...data.getHeaders(),
    },
    data: data,
  };

  const response = await axios.request(config);
  if (response.data) {
    return {
      status: "success",
      data: response.data.id,
    };
  } else {
    return {
      status: "error",
      data: response.message ? response.message : response,
    };
  }
};
const facebook_create_carousel = async (
  id,
  name,
  object_story_spec,
  fileData,
  access_token
) => {
  try {
    if (fileData.length > 0) {
      // create carousel through upload files
      let num_of_file = fileData.length;
      let num_of_image = 0;
      let num_of_video = 0;
      for (let i = 0; i < num_of_file; i++) {
        let file_type = fileData[i].mimetype.split("/").shift();
        if (file_type === "image") {
          num_of_image++;
        } else if (file_type === "video") {
          num_of_video++;
        } else {
          break;
        }
      }
      if (num_of_file === num_of_image) {
        for (let i = 0; i < fileData.length; i++) {
          let result = await facebook_get_image_hash(
            fileData[i].path,
            fileData[i].filename,
            access_token
          );
          let { hash, url, name } =
            result.data.images[`${fileData[i].filename}`];
          object_story_spec.link_data.child_attachments[i].image_hash = hash;
          object_story_spec.link_data.child_attachments[i].link = url;
        }
        // upload image and create carousel
        let carousel_result = await creat_image_carousel(
          id,
          name,
          object_story_spec,
          access_token
        );
        if (carousel_result.status === "success") {
          return {
            status: "success",
            data: carousel_result.data,
          };
        } else {
          return {
            status: "error",
            data: carousel_result.data,
          };
        }
      } else if (num_of_file === num_of_video) {
        // upload video and create carousel
        return {
          status: "error",
          data: "upload video and create carousel not implemented",
        };
      } else {
        return {
          status: "error",
          data: "upload only image or video",
        };
      }
    } else {
      // create carousel through existing files
      for (
        let i = 0;
        i < object_story_spec.link_data.child_attachments.length;
        i++
      ) {
        if ("video_id" in object_story_spec.link_data.child_attachments[i]) {
          let result = await facebook_get_image_hash_with_remote_url(
            object_story_spec.link_data.child_attachments[i].link,
            "sample_image",
            access_token
          );
          if (result.status === "success") {
            let { hash, url, name } = result.data.images[`temp_image.jpg`];
            object_story_spec.link_data.child_attachments[i].image_hash = hash;
            object_story_spec.link_data.child_attachments[i].link = url;
          } else {
            return {
              status: "error",
              data: "error on hash_image creation",
            };
          }
        }
      }
      if(object_story_spec.link_data.child_attachments.length < 2){
        return {
          status: "error",
          data: "select at least two image or video for carousel",
        };
      }
      else{
        let carousel_result = await creat_image_carousel(
          id,
          name,
          object_story_spec,
          access_token
        );
        if (carousel_result.status === "success") {
          return {
            status: "success",
            data: carousel_result.data,
          };
        } else {
          return {
            status: "error",
            data: carousel_result.data,
          };
        }
      }
    }
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      data: error.message ? error.message : error,
    };
  }
};

const facebook_get_businesses = async (access_token) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${facebook_url}/me/businesses?fields=id,name,created_by,owned_ad_accounts{name},owned_pages&access_token=${access_token}`,
      headers: {
        Cookie:
          "fr=0o1dLdoVGBvM3uvVe..BkeH03.jx.AAA.0.0.BkeH1X.AWVSxHsEyv4; sb=N314ZHuJdDmCSWwuzfh_bS6Z",
      },
    };

    const businesses = await axios.request(config);
    if (businesses.data) {
      for (let j = 0; j < businesses.data.data.length; j++) {
        if(businesses.data.data[j].owned_ad_accounts){
          businesses.data.data[j].owned_ad_accounts = businesses.data.data[j].owned_ad_accounts.data
        }else{
          businesses.data.data[j].owned_ad_accounts = []
        }
        if(businesses.data.data[j].owned_pages){
          businesses.data.data[j].owned_pages = businesses.data.data[j].owned_pages.data
        }else{
          businesses.data.data[j].owned_pages = []
        }
      }
      return {
        status: "success",
        data: businesses.data,
      };
    } else {
      return {
        status: "unsuccesfull",
        data: businesses,
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

const facebook_get_account_images = async (ad_account_id, access_token) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${facebook_url}/${ad_account_id}/adimages?limit=10000&fields=created_time,hash,name,permalink_url,status,updated_time,url&access_token=${access_token}`,
      headers: {
        Cookie:
          "fr=0o1dLdoVGBvM3uvVe..BkeH03.jx.AAA.0.0.BkeH1X.AWVSxHsEyv4; sb=N314ZHuJdDmCSWwuzfh_bS6Z",
      },
    };

    const images = await axios.request(config);
    if (images.data) {
      return {
        status: "success",
        data: images.data.data,
      };
    } else {
      return {
        status: "unsuccesfull",
        data: images,
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

const facebook_get_account_videos = async (ad_account_id, access_token) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${facebook_url}/${ad_account_id}/advideos?limit=10000&fields=id,thumbnails&access_token=${access_token}`,
      headers: {
        Cookie:
          "fr=0o1dLdoVGBvM3uvVe..BkeH03.jx.AAA.0.0.BkeH1X.AWVSxHsEyv4; sb=N314ZHuJdDmCSWwuzfh_bS6Z",
      },
    };

    const videos = await axios.request(config);

    for(let i=0;i<videos.data.data.length;i++){
        videos.data.data[i].thumbnails = videos.data.data[i].thumbnails.data[0]
    }
    if (videos.data.data) {
      return {
        status: "success",
        data: videos.data.data,
      };
    } else {
      return {
        status: "unsuccesfull",
        data: videos,
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

const facebook_update_campaign = async (campaign_id, params, access_token) => {
  try {
    let data = new FormData();
    for (const key in params) {
      if (`${key}` !== "special_ad_categories") {
        data.append(`${key}`, `${params[key]}`);
      }
    }
    if ("special_ad_categories" in params) {
      data.append(
        "special_ad_categories",
        JSON.stringify(params.special_ad_categories)
      );
    }
    data.append("access_token", access_token);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${facebook_url}/${campaign_id}`,
      headers: {
        ...data.getHeaders(),
      },
      data: data,
    };
    let response = await axios.request(config);
    if (response.data) {
      return {
        status: "success",
        data: response.data,
      };
    } else {
      return {
        status: "error",
        data: response.message ? response.message : response,
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

const facebook_update_adset = async (adset_id, params, access_token) => {
  try {
    let data = new FormData();
    for (const key in params) {
      if (
        `${key}` !== "bid_adjustments" &&
        `${key}` !== "promoted_object" &&
        `${key}` !== "targeting"
      ) {
        data.append(`${key}`, `${params[key]}`);
      }
    }
    if ("bid_adjustments" in params) {
      data.append("bid_adjustments", JSON.stringify(params.bid_adjustments));
    }
    if ("promoted_object" in params) {
      data.append("promoted_object", JSON.stringify(params.promoted_object));
    }
    if ("targeting" in params) {
      data.append("targeting spec", JSON.stringify(params.targeting));
    }
    data.append("access_token", access_token);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${facebook_url}/${adset_id}`,
      headers: {
        ...data.getHeaders(),
      },
      data: data,
    };
   return axios.request(config).then((res)=>{      
    return {
      status: "success",
      data: res.data,
    } }).catch(error=> {
      return {
        status: "error",
        data: error.response.data.error.error_user_msg ? error.response.data.error.error_user_msg : error.response.data.error
      }
    })
  } catch (error) {
    return {
      status: "error",
      data: error,
    };
  }
};
const downloadImage = async (url, imagePath) => {
  const response = await axios.get(url, { responseType: "stream" });
  await streamPipeline(response.data, createWriteStream(imagePath));
};

const facebook_get_image_hash_with_remote_url = async (
  imageURL,
  imageName,
  access_token
) => {
  try {
    const imagePath = path.join(__dirname, "temp_image.jpg");
    await downloadImage(imageURL, imagePath);
    const data = new FormData();
    data.append(imageName, fs.createReadStream(imagePath));
    data.append("access_token", access_token);

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://graph.facebook.com/v17.0/act_1239957706633747/adimages",
      headers: {
        ...data.getHeaders(),
      },
      data: data,
    };

    const response = await axios.request(config);
    fs.unlinkSync(imagePath); // Remove temporary image file

    if (response.data) {
      return {
        status: "success",
        data: response.data,
      };
    } else {
      return {
        status: "error",
        data: response.message ? response.message : response,
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



const facebook_update_ads = async (ad_id, params_data, access_token) => {
  try {
    let data = new FormData();
    for (const key in params_data) {
      if (
        `${key}` !== "cost_per_action_type" &&
        `${key}` !== "actions" &&
        `${key}` !== "cost_per_unique_action_type" &&
        `${key}` !== "website_ctr"
      ) {
        data.append(`${key}`, `${params_data[key]}`);
      }
    }
    if ("cost_per_action_type" in params_data) {
      data.append(
        "cost_per_action_type",
        JSON.stringify(params_data.cost_per_action_type)
      );
    } else if ("actions" in params_data) {
      data.append("actions", JSON.stringify(params_data.actions));
    } else if ("cost_per_unique_action_type" in params_data) {
      data.append(
        "cost_per_unique_action_type",
        JSON.stringify(params_data.cost_per_unique_action_type)
      );
    } else if ("website_ctr" in params_data) {
      data.append("website_ctr", JSON.stringify(params_data.website_ctr));
    }
    data.append("access_token", access_token);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${facebook_url}/${ad_id}`,
      headers: {
        ...data.getHeaders(),
      },
      data: data,
    };
    let response = await axios.request(config);
    console.log("-------------response---", response);
    if (response.data) {
      return {
        status: "success",
        data: response.data,
      };
    } else {
      return {
        status: "error",
        data: response.message ? response.message : response,
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

const facebook_get_campaign_by_id = async (
  campaign_id,
  access_token
) => {
  try {
    let fields_data=fields_constant.fields[5]
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${facebook_url}/${campaign_id}?fields=${fields_data}&access_token=${access_token}`,
      headers: {},
    };
    let response = await axios.request(config);
    if (response.data) {
      return {
        status: "success",
        data: response.data,
      };
    } else {
      return {
        status: "error",
        data: response.message ? response.message : response,
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

const facebook_get_adset_by_id = async (adset_id, access_token) => {
  try {
    let fields_data=fields_constant.fields[2]
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${facebook_url}/${adset_id}?fields=${fields_data}&access_token=${access_token}`,
      headers: {},
    };

    let response = await axios.request(config);
    if (response.data) {
      return {
        status: "success",
        data: response.data,
      };
    } else {
      return {
        status: "error",
        data: response.message ? response.message : response,
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
module.exports = {
  facebook_create_campaign,
  facebook_get_Insights,
  facebook_create_adSet,
  facebook_get_adSet,
  facebook_get_ads,
  facebook_create_ad,
  facebook_get_creative,
  facebook_create_creative,
  facebook_get_user_account_id,
  facebook_get_accounts_pages,
  facebook_get_location,
  facebook_create_creative_video_upload,
  facebook_create_creative_video,
  facebook_get_video,
  facebook_get_images,
  facebook_create_carousel,
  facebook_get_businesses,
  facebook_get_account_images,
  facebook_get_account_videos,
  facebook_update_campaign,
  facebook_update_adset,
  facebook_update_ads,
  facebook_get_campaign_by_id,
  facebook_get_adset_by_id,
};
