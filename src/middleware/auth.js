const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { TOKEN_NOT_FOUND, UNAUTHORIZED_USER } = require("../utils/message");
const responseApi = require("../utils/apiresponse");
const User = require("../models/user");
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
  let userDataByEmail = await User.findOne({email:req.auth.email});
  if (userDataByEmail?.facebook_token) {
    let api = bizSdk.FacebookAdsApi.init(userDataByEmail.facebook_token);
    const showDebugingInfo = true; // Setting this to true shows more debugging info.
    if (showDebugingInfo) {
      api.setDebug(true);
    }
    req.facebook_token = userDataByEmail.facebook_token;
  } else {
    return responseApi.ErrorResponse(res, "Unable to find facebook_token!!", "");
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
