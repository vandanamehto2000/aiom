const { StatusCodes } = require('http-status-codes')
const requestValidator = (schema, isQuery) => {
  return async (req, res, next) => {
    const options = {
      errors: {
        wrap: {
          label: "",
        },
      },
      abortEarly: false,
    };
    const { error } = await schema.validate(req.body, options);
    let errorData = error?.details.map((item) => ({
      [item.context.label]: item.message,
    }));
    if (error) {
      next({
        statusCode: StatusCodes.BAD_REQUEST,
        status: false,
        message: error?.details.map((item) => item.message).join(", "),
        error: errorData,
      });
    }
    next();
  };
};

module.exports = requestValidator