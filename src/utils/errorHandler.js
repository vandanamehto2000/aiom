const errorHandler = (payload, req, res, next) => {
  return res.status(payload.status || 500).json({
    status: payload.status || false,
    message: payload.message || "Oops! something went wrong.",
    data: payload.data || [],
    [payload.error && "error"]: payload.error,
  });
};

module.exports = errorHandler;