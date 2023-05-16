const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { TOKEN_NOT_FOUND, UNAUTHORIZED_USER } = require("../utils/message");
const responseApi = require("../utils/apiresponse");


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

// check_role
const roles_auth = (roles) => {
  return (req, res, next) => {

    console.log(req.auth);

    if (!roles.includes(req.auth.roles)) {
      return responseApi.ErrorResponse(res, "role does not have access to this endpoint");
    }

    next();
  }
}


module.exports = { authenticateToken, roles_auth }
