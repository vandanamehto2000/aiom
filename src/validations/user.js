const Joi = require("joi");

const registerUser = Joi.object({
    username : Joi.string().required(),
    email : Joi.string().required().email(),
    password : Joi.string().required().min(3)
})

const loginUser = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required().min(3),
});

module.exports = {registerUser, loginUser };
