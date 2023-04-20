const {StatusCodes} = require('http-status-codes')
const test = async (req, res, next) => {
  try {
    const {name,email,phone}=req.body
    const data = { name, email, phone };
    next({
      status: StatusCodes.OK,
      message: "test data post successfully",
      data: data,
    });
  } catch (err) {
    next({
      status: StatusCodes.BAD_REQUEST,
      message: err.message,
    });
  }
};

module.exports = { test };
