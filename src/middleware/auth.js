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
  // console.log("---------------------",req.auth)
  let userDataById = await User.findById(req.auth._id);
  if (userDataById.facebook_token) {
    let api = bizSdk.FacebookAdsApi.init(userDataById.facebook_token);
    req.facebook_token = userDataById.facebook_token;

  } else {
    return responseApi.ErrorResponse(res, "facebook_token does not find", "");
  }

  next();
}

// check_role
const roles_auth = (roles) => {
  return (req, res, next) => {

    console.log(req.auth);

    if (!roles.includes(req.auth.roles)) {
      return responseApi.ErrorResponse(res, "role does not have access to this endpoint", "");
    }
    next();
  }
}


module.exports = { authenticateToken, fb_middleware, roles_auth }
