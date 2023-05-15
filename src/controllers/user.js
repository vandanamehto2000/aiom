const CryptoJS = require("crypto-js");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Role = require("../models/role");

const generateAccessToken = (response) => {
  return jwt.sign(
    {
      _id: response._id,
      email: response.email,
      username: response.username,
    },
    process.env.JWT_SEC,
    { expiresIn: "30m" }
  );
};

const register = async (req, res, next) => {
  const newUser = {
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET
    ).toString(),
    roles: req.body.roles
  };
  try {
    let userData = await User.create(newUser);
    return next({
      status: StatusCodes.CREATED,
      message: "User created successfully",
      data: userData,
    });
  } catch (err) {
    console.log(err);
    err.code === 11000
      ? next({
          status: StatusCodes.BAD_REQUEST,
          message: "User already exist",
        })
      : next({
          status: StatusCodes.BAD_REQUEST,
          message: err.message,
        });
  }
};

const login = async (req, res, next) => {
  try {
    const response = await User.findOne({ email: req.body.email });
    console.log(response, "ppppppppppppppppp")
    if (response) {
      let bytes = CryptoJS.AES.decrypt(
        response.password,
        process.env.PASS_SECRET
      );
      console.log(bytes)

      let decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
      console.log(decryptedPassword, "...............")
      if (req.body.password === decryptedPassword) {
        console.log(req.body.password===decryptedPassword)
        const token1 = generateAccessToken(response);
        console.log(token1)
        let data = await User.findOneAndUpdate(
          { email: req.body.email },
          { token: token1 },
          { new: true }
        );
        console.log(data, "+++++++++++++")
        next({
          status: StatusCodes.OK,
          message: "User login successfully",
          data: data,
        });
      } else {
        next({
          status: StatusCodes.BAD_REQUEST,
          message: "Password entered is incorrect",
        });
      }
    } else {
      next({
        status: StatusCodes.BAD_REQUEST,
        message: `No user found with email ${req.body.email}`,
      });
    }
  } catch (err) {
    console.log(err);
    next({
      status: StatusCodes.BAD_REQUEST,
      message: err.message,
    });
  }
};

const logout = async (req, res, next) => {
  try {
    let { _id, email, username } = req.auth;
    console.log(_id, email, username)
    let token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const response = await User.find({ email: email });
    console.log(response)
    console.log(response.length !== 0)
    console.log(response[0].token === token)
    if (response.length !== 0 && response[0].token === token) {
      await User.updateOne({ token: token }, { token: "" }, { new: true });
      next({
        status: StatusCodes.OK,
        message: "You logged out successfully",
      });
    }
    // else if(response.length !== 0 && response[0].token === "") {
    //   next({
    //     status: StatusCodes.OK,
    //     message: "User Already Logged Out",
    //   });
    // }
    else {
      next({
        status: StatusCodes.OK,
        message: "Unauthorized User",
      });
    }
  } catch (err) {
    next({
      status: StatusCodes.BAD_REQUEST,
      message: err.message,
    });
  }
};

module.exports = { register, login, logout };
