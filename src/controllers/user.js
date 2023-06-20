const CryptoJS = require("crypto-js");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const responseApi = require("../utils/apiresponse");

const generateAccessToken = (response) => {
  return jwt.sign(
    {
      _id: response._id,
      email: response.email,
      username: response.username,
      roles: response.roles,
      organization: response.organization

    },
    process.env.JWT_SEC
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
    organization: req.body.organization,
    roles: req.body.roles,
    assigned_BM: req.body.assigned_BM
  };
  try {
    console.log("data-", newUser)
    let userData = await User.create(newUser);
    return responseApi.successResponseWithData(res, "User created successfully", userData, StatusCodes.CREATED);

  } catch (err) {
    console.log(err);
    err.code === 11000
      ? responseApi.ErrorResponse(res, "Password entered is incorrect", req.body.email, StatusCodes.BAD_REQUEST)
      : responseApi.ErrorResponse(res, "error", error.message ? error.message : error);
  }
};

const login = async (req, res, next) => {
  try {
    const response = await User.findOne({ email: req.body.email });
    if (response) {
      let bytes = CryptoJS.AES.decrypt(
        response.password,
        process.env.PASS_SECRET
      );

      let decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
      if (req.body.password === decryptedPassword) {
        const token1 = generateAccessToken(response);
        let data = await User.findOneAndUpdate(
          { email: req.body.email },
          { token: token1 },
          { new: true }
        );
        return responseApi.successResponseWithData(res, "User login successfully", data, StatusCodes.OK);

      } else {
        return responseApi.ErrorResponse(res, "Password entered is incorrect", req.body.password, StatusCodes.BAD_REQUEST);

      }
    } else {
      return responseApi.ErrorResponse(res, `No user found with email ${req.body.email}`, req.body.email, StatusCodes.BAD_REQUEST);

    }
  } catch (error) {
    console.log(error);
    return responseApi.ErrorResponse(res, "error", error.message ? error.message : error);

  }
};

const logout = async (req, res, next) => {
  try {
    let { _id, email, username, roles, organization } = req.auth;
    let token = req.headers.authorization.split(" ")[1];
    const response = await User.find({ email: email });

    if (response.length !== 0 && response[0].token === token) {
      await User.updateOne({ token: token }, { token: "" }, { new: true });
      return responseApi.successResponseWithData(res, "You logged out successfully", "", StatusCodes.OK);

    }
    else {
      return responseApi.ErrorResponse(res, "Unauthorized User", "", StatusCodes.OK);

    }
  } catch (error) {
    return responseApi.ErrorResponse(res, "error", error.message ? error.message : error);

  }
};


const employee_details = async (req, res, next) => {
  try {
    let organization_data;
    let result = [];

    if (req.body.organization == "aiom") {
      organization_data = await User.find({ organization: req.body.organization }, { username: 1, email: 1, roles: 1})
      if (!organization_data) {
        return responseApi.ErrorResponse(res, "unable to find Organization data.", organization_data, StatusCodes.NOT_FOUND);
      } else {
        for (let i = 0; i < organization_data.length; i++) {
          if (organization_data[i].email != req.body.email) {
            result.push(organization_data[i])
          }
        }
        return responseApi.successResponseWithData(res, "found organization data", result, StatusCodes.OK);
      }
    } else {
      return responseApi.ErrorResponse(res, "No Organization Found.", req.body.organization, StatusCodes.BAD_REQUEST);
    }

  } catch (error) {
    return responseApi.ErrorResponse(res, "error", error.message ? error.message : error);

  }
}

const update_bm = async (req, res, next) => {
  try {
    let { flag, id, name, email } = req.body;
    let data = [];
    for (let i = 0; i < email.length; i++) {
      data.push(email[i].email);
    }
    const users_data = await User.find({
      email: { $in: data },
    });
    if (users_data.length > 0) {
      const bulkWriteOperations = [];
      for (let i = 0; i < users_data.length; i++) {
        for (let j = 0; j < email.length; j++) {
          if (users_data[i].email === email[j].email) {
            bulkWriteOperations.push({
              updateOne: {
                filter: { _id: users_data[i]._id, email: users_data[i].email },
                update: {
                  $set: { roles: email[j].role },
                  $push: {
                    [`${flag}`]: {
                      id: id,
                      name: name,
                    },
                  },
                },
              },
            });
          }
        }
      }
      const result = await User.bulkWrite(bulkWriteOperations);
      return responseApi.successResponseWithData(
        res,
        "User data Successfully updates!!",
        result,
        StatusCodes.OK
      );
    } else {
      return responseApi.successResponseWithData(
        res,
        "User data Not found !!",
        [],
        StatusCodes.OK
      );
    }
  } catch (error) {
    console.log("Error", error);
    return responseApi.ErrorResponse(
      res,
      "error",
      error.message ? error.message : error
    );
  }
};



module.exports = { register, login, logout, employee_details, update_bm };
