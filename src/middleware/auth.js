const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const secretKey = require("../dbConfig/secretKey");
const { TOKEN_NOT_FOUND, UNAUTHORIZED_USER } = require("../utils/message");

function authenticateToken(req, res, next) {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return next({
        statusCode: httpStatus.UNAUTHORIZED,
        status: false,
        message: TOKEN_NOT_FOUND,
      });
    }

    //  find by token
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return next({
          statusCode: httpStatus.UNAUTHORIZED,
          status: false,
          message: UNAUTHORIZED_USER,
        });
      }
      req.auth = decoded;
      next();
    });
  } else {
    return next({
      statusCode: httpStatus.UNAUTHORIZED,
      status: false,
      message: TOKEN_NOT_FOUND,
    });
  }
}

module.exports = { authenticateToken };
