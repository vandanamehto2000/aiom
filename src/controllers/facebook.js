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
const multer = require("multer");
const responseApi = require("../utils/apiresponse");

//multer for file upload
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("--------------",file)
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    console.log("-------filename-------",file)
    cb(null, Date.now() + "-" + file.originalname);
  },
});

let upload = multer({ storage: storage });
const uploadFile = upload.single("hasImage");

//Create a Campaign
const create_campaign = async (req, res, next) => {
  try {
    let { id, fields, params } = req.body;
    const facebook_result = await facebook_create_campaign(id, fields, params);
    if (facebook_result.status == "success") {
      let statusCode = StatusCodes.CREATED;
      let msg = "success";
      let data = facebook_result.data;
      return responseApi.successResponseWithData(res, msg, data, statusCode);
    } else {
      let statusCode = StatusCodes.BAD_REQUEST;
      let msg = "error";
      let data = facebook_result.data;
      return responseApi.ErrorResponse(res, msg, data, statusCode);
    }
  } catch (error) {
    console.log("Error Message:" + error);
    console.log("Error Stack:" + error.stack);
    let statusCode = StatusCodes.BAD_REQUEST;
    let msg = "error";
    let data = error.message ? error.message : error;
    return responseApi.ErrorResponse(res, msg, data, statusCode);
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
      let statusCode = StatusCodes.OK;
      let msg = "success";
      let data = campaignss.data;
      return responseApi.successResponseWithData(res, msg, data, statusCode);
    } else {
      let statusCode = StatusCodes.BAD_REQUEST;
      let msg = "error";
      let data = campaignss.data;
      return responseApi.ErrorResponse(res, msg, data, statusCode);
    }
  } catch (error) {
    console.log("Error Message:" + error);
    console.log("Error Stack:" + error.stack);
    let statusCode = StatusCodes.BAD_REQUEST;
    let msg = "error";
    let data = error.message ? error.message : error;
    return responseApi.ErrorResponse(res, msg, data, statusCode);
  }
};

//Create AdSET
const create_adSet = async (req, res, next) => {
  try {
    let { id, fields, params } = req.body;
    const adsets = await facebook_create_adSet(id, fields, params);
    if (adsets.status === "success") {
      let statusCode = StatusCodes.CREATED;
      let msg = "success";
      let data = adsets.data;
      return responseApi.successResponseWithData(res, msg, data, statusCode);
    } else {
      let statusCode = StatusCodes.BAD_REQUEST;
      let msg = "error";
      let data = adsets.data;
      return responseApi.ErrorResponse(res, msg, data, statusCode);
    }
  } catch (error) {
    console.log("Error Message:" + error);
    console.log("Error Stack:" + error.stack);
    let statusCode = StatusCodes.BAD_REQUEST;
    let msg = "error";
    let data = error.message ? error.message : error;
    return responseApi.ErrorResponse(res, msg, data, statusCode);
  }
};

const get_adSet = async (req, res, next) => {
  try {
    let { id, fields_array } = req.query;
    let fields = JSON.parse(fields_array);
    let params = {};
    const adset_data = await facebook_get_adSet(id, fields, params);
    if (adset_data.status == "success") {
      let statusCode = StatusCodes.OK;
      let msg = "success";
      let data = adset_data.data;
      return responseApi.successResponseWithData(res, msg, data, statusCode);
    } else {
      let statusCode = StatusCodes.BAD_REQUEST;
      let msg = "error";
      let data = adset_data.data;
      return responseApi.ErrorResponse(res, msg, data, statusCode);
    }
  } catch (error) {
    console.log("Error Message: controller" + error);
    console.log("Error Stack:" + error.stack);
    let statusCode = StatusCodes.BAD_REQUEST;
    let msg = "error";
    let data = error.message ? error.message : error;
    return responseApi.ErrorResponse(res, msg, data, statusCode);
  }
};

//Create creative
const create_creative = async (req, res, next) => {
  try {
    uploadFile(req, res, async function (err) {
      console.log("first---------")
      if (err instanceof multer.MulterError || !req.file || err) {
        let statusCode = StatusCodes.BAD_REQUEST;
        let msg = "error";
        let data = err;
        console.log("instanceof-----",data)
        return responseApi.ErrorResponse(res, msg, data, statusCode);
      } else {
        let { id, fields, params } = req.body;
        let {path,filename,originalname,fieldname}=req.file;
      //  let imageName = JSON.parse(filename);
      //   let imagePath = JSON.parse(path);
        id = JSON.parse(id);
        fields = JSON.parse(fields);
        params = JSON.parse(params);
        const adcreatives = await facebook_create_creative(path,filename,id, fields, params);
        if (adcreatives.status == "success") {
          let statusCode = StatusCodes.CREATED;
          let msg = "success";
          let data = adcreatives.data;
          return responseApi.successResponseWithData(res, msg, data, statusCode);
        } else {
          let statusCode = StatusCodes.BAD_REQUEST;
          let msg = "error";
          let data = adcreatives.data;
          return responseApi.ErrorResponse(res, msg, data, statusCode);
        }
      }
    });
  } catch (error) {
    console.log(error);
    console.log("Error Message:" + error);
    console.log("Error Stack:" + error.stack);
    let statusCode = StatusCodes.BAD_REQUEST;
    let msg = "error";
    let data = error.message ? error.message : error;
    return responseApi.ErrorResponse(res, msg, data, statusCode);
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
