exports.successResponseWithData = function (res, msg, data, statusCode, optional = null) {
  let resData = {
    status: "success",
    message: msg,
    data: data,
    optional: optional,
  };
  return res.status(statusCode || 200).json(resData);
};

exports.ErrorResponse = function (res, msg, data, statusCode, optional = null) {
  const resData = {
    status: "error",
    message: msg,
    data: data,
    optional: optional,
  };
  return res.status(statusCode || 500).json(resData);
};
