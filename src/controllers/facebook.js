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
} = require("../platform/facebook");
const { StatusCodes } = require("http-status-codes");
const multer = require("multer");
const responseApi = require("../utils/apiresponse");
const { APIResponse } = require("facebook-nodejs-business-sdk");

console.log()
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
const uploadFile = upload.single("hasImage");

//Create a Campaign
const create_campaign = async (req, res, next) => {
  try {
    const { id, fields, params } = req.body;
    if (!(id && fields && params)) {
      return responseApi.ErrorResponse(res, "All input is required", StatusCodes.BAD_REQUEST)
    }

    if (!(params.name && params.objective && params.special_ad_categories)) {
      return responseApi.ErrorResponse(res, "One of the fields is missing-(name, objective, special_ad_categories)", StatusCodes.BAD_REQUEST)
    }

    const facebook_result = await facebook_create_campaign(id, fields, params);
    console.log(facebook_result, "++++++++++++++++++++++++++++++++++")
    if (facebook_result.status == "success") {
      return responseApi.successResponseWithData(res, "success", facebook_result.data, StatusCodes.CREATED);
    } else {
      return responseApi.ErrorResponse(res, "error", facebook_result.data, StatusCodes.BAD_REQUEST);
    }
  } catch (error) {
    console.log("Error Message:" + error);
    console.log("Error Stack:" + error.stack);
    return responseApi.ErrorResponse(res, "error", error.message ? error.message : error);
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
      return responseApi.successResponseWithData(res, "success", campaignss.data, StatusCodes.OK);
    } else {
      return responseApi.ErrorResponse(res, "error", campaignss.data, StatusCodes.BAD_REQUEST);
    }
  } catch (error) {
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
      return responseApi.ErrorResponse(res, "All input is required, One of the fields is missing-(id, fields, params)", StatusCodes.BAD_REQUEST)
    }

    const adsets = await facebook_create_adSet(id, fields, params);
    if (adsets.status === "success") {
      return responseApi.successResponseWithData(res, "success", adsets.data, StatusCodes.CREATED);
    } else {
      return responseApi.ErrorResponse(res, "error", adsets.data, StatusCodes.BAD_REQUEST);
    }
  } catch (error) {
    console.log("Error Message:" + error);
    console.log("Error Stack:" + error.stack);
    return responseApi.ErrorResponse(res, "error", error.message ? error.message : error);
  }
};

const get_adSet = async (req, res, next) => {
  try {
    let { id, fields_array } = req.query;
    let fields = JSON.parse(fields_array);
    let params = {};
    const adset_data = await facebook_get_adSet(id, fields, params);
    if (adset_data.status == "success") {
      return responseApi.successResponseWithData(res, "success", adset_data.data, StatusCodes.OK);
    } else {
      return responseApi.ErrorResponse(res, "error", adset_data.data, StatusCodes.BAD_REQUEST);
    }
  } catch (error) {
    console.log("Error Message: controller" + error);
    console.log("Error Stack:" + error.stack);
    return responseApi.ErrorResponse(res, "error", error.message ? error.message : error);
  }
};

//Create creative
const create_creative = async (req, res, next) => {
  try {
    uploadFile(req, res, async function (err) {
      if (err instanceof multer.MulterError || !req.file || err) {
        return responseApi.ErrorResponse(res, "error", err, StatusCodes.BAD_REQUEST);
      } else {
        let { id, fields, params } = req.body;
        let { path, filename, originalname, fieldname } = req.file;
        id = JSON.parse(id);
        fields = JSON.parse(fields);
        params = JSON.parse(params);
        const adcreatives = await facebook_create_creative(path, filename, id, fields, params);
        if (adcreatives.status == "success") {
          return responseApi.successResponseWithData(res, "success", adcreatives.data, StatusCodes.CREATED);
        } else {
          return responseApi.ErrorResponse(res, "error", adcreatives.data, StatusCodes.BAD_REQUEST);
        }
      }
    });
  } catch (error) {
    console.log(error);
    console.log("Error Message:" + error);
    console.log("Error Stack:" + error.stack);
    return responseApi.ErrorResponse(res, "error", error.message ? error.message : error);
  }
};

//get Creative
const get_creative = async (req, res, next) => {
  try {
    let { id, fields } = req.query;
    fields = JSON.parse(fields);
    id = JSON.parse(id);
    let params = {};
    const creative_data = await facebook_get_creative(id, fields, params);
    if (creative_data.status == "success") {
      return responseApi.successResponseWithData(res, "success", creative_data.data, StatusCodes.OK);
    } else {
      return responseApi.ErrorResponse(res, "error", creative_data.data, StatusCodes.BAD_REQUEST);
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

const get_account_pages = async (req, res, next) => {
  try {
      const account_pages = await facebook_get_accounts_pages()
      if(account_pages.status!=="success"){
        return responseApi.ErrorResponse(res, "error",account_pages.data, StatusCodes.BAD_REQUEST);
      }
        return responseApi.successResponseWithData(res,"success",account_pages.data)  
  } catch (error) {
    console.log(error);
    console.log("Error Message:" + error);
    console.log("Error Stack:" + error.stack);
    return responseApi.ErrorResponse(res, "error", error.message ? error.message : error);
  }
}

const get_location_keys = async (req,res,next)=>{
  try {
    let { location,country_code }= req.query
    location = JSON.parse(location)
    if(!location){
      return responseApi.ErrorResponse(res,"error",data,"Location Params is required ",StatusCodes.BAD_REQUEST)
    }
    const location_details = await facebook_get_location(location)
    let filtered_location = location_details.data
    if(country_code){
       filtered_location = location_details.data.data.filter((item)=>{
        return `"${item.country_code}"` ==country_code
      })
    }
    if(location_details.status==="success"){
      return responseApi.successResponseWithData(res,"success",filtered_location)
    }else{
      return responseApi.ErrorResponse(res,"error",data,location_details.data,StatusCodes.BAD_REQUEST)
    }
    
  } catch (error) {
    return responseApi.ErrorResponse(res, "error", error.message ? error.message : error);
  }
}

module.exports = {
  create_campaign,
  get_campaign,
  create_adSet,
  get_adSet,
  create_creative,
  get_creative,
  create_ad,
  get_account_pages,
  get_location_keys
};