const Joi = require("joi");

const registerUser = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(3),
  organization: Joi.string().required(),
  roles: Joi.string().required(),
  assigned_BM:Joi.array()

})

const loginUser = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required().min(3),
});

module.exports = { registerUser, loginUser };
