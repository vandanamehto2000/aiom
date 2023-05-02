const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { TOKEN_NOT_FOUND, UNAUTHORIZED_USER } = require("../utils/message");

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

module.exports = authenticateToken;
