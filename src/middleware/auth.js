const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { TOKEN_NOT_FOUND, UNAUTHORIZED_USER } = require("../utils/message");
const responseApi = require("../utils/apiresponse");
const User = require("../models/user");
const Business = require("../models/businees");
const bizSdk = require("facebook-nodejs-business-sdk");


function authenticateToken(req, res, next) {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return next({
        statusCode: StatusCodes.UNAUTHORIZED,
        message: TOKEN_NOT_FOUND,
      });
    }

    //  find by token
    jwt.verify(token, process.env.JWT_SEC, (err, decoded) => {
      if (err) {
        console.log(err);
        return next({
          status: StatusCodes.UNAUTHORIZED,
          message: UNAUTHORIZED_USER,
        });
      }
      req.auth = decoded;
      next();
    });
  } else {
    return next({
      status: StatusCodes.UNAUTHORIZED,
      message: TOKEN_NOT_FOUND,
    });
  }
}

// facebook_token middleware

const fb_middleware = async (req, res, next) => {
  let businesses_data = await Business.findOne({ user_id: req.auth._id });
  if (businesses_data) {
    let api = bizSdk.FacebookAdsApi.init(businesses_data?.facebook_token);
    // const showDebugingInfo = true; // Setting this to true shows more debugging info.
    // if (showDebugingInfo) {
    //   api.setDebug(true);
    // }
    req.facebook_token = businesses_data.facebook_token;
  }else{        //Check for assigned BM or assigned ad_account
    let assigned_data = await User.findOne({_id:req.auth._id})
    if(!assigned_data){
      return responseApi.ErrorResponse(res,"Error parsing token", "Invalid token",StatusCodes.BAD_REQUEST)
    }

    if(assigned_data.assigned_BM === undefined && assigned_data.assigned_ad_account === undefined){
      return responseApi.ErrorResponse(res,"No Asset Assigned", "You have not been assigned to any Business or Ad-Account yet. Please wait!!")
    }

    if(assigned_data.assigned_BM &&  assigned_data.assigned_ad_account){
      if(assigned_data.assigned_BM?.length === 0 && assigned_data.assigned_ad_account?.length === 0 ){     //If no asset is assigned 
        return responseApi.ErrorResponse(res,"No Asset Assigned", "You have not been assigned to any Business or Ad-Account yet. Please wait!!")
      }
    }
    

    if(assigned_data.facebook_token === null || assigned_data.facebook_token ==undefined){    //If one or more assets assigned but no facebook_token

      if(assigned_data.assigned_BM && assigned_data.assigned_BM?.length !==0){
        assigned_data.facebook_token = assigned_data.assigned_BM[0].facebook_token
      }else if(assigned_data.assigned_ad_account && assigned_data.assigned_ad_account?.length !==0){
        assigned_data.facebook_token = assigned_data.assigned_ad_account[0].facebook_token
      }else{
        return responseApi.ErrorResponse(res,"No Asset Selected", "Please select an Asset to acces this feature!!")
      } 
    }

    


    let api = bizSdk.FacebookAdsApi.init(assigned_data.facebook_token);

    req.facebook_token = assigned_data.facebook_token 
  } 
  
  next();
}

// check_role
const roles_auth = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.auth.roles)) {
      return responseApi.ErrorResponse(res, "role does not have access to this endpoint", "");
    }
    next();
  }
}


module.exports = { authenticateToken, fb_middleware, roles_auth }
