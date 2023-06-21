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
      organization: response.organization,
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
    assigned_BM: req.body.assigned_BM,
  };
  try {
    console.log("data-", newUser);
    let userData = await User.create(newUser);
    return responseApi.successResponseWithData(
      res,
      "User created successfully",
      userData,
      StatusCodes.CREATED
    );
  } catch (err) {
    console.log(err);
    err.code === 11000
      ? responseApi.ErrorResponse(
          res,
          "Password entered is incorrect",
          req.body.email,
          StatusCodes.BAD_REQUEST
        )
      : responseApi.ErrorResponse(
          res,
          "error",
          error.message ? error.message : error
        );
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
        return responseApi.successResponseWithData(
          res,
          "User login successfully",
          data,
          StatusCodes.OK
        );
      } else {
        return responseApi.ErrorResponse(
          res,
          "Password entered is incorrect",
          "password is incorrect !!",
          StatusCodes.BAD_REQUEST
        );
      }
    } else {
      return responseApi.ErrorResponse(
        res,
        `No user found with email ${req.body.email}`,
        req.body.email,
        StatusCodes.BAD_REQUEST
      );
    }
  } catch (error) {
    console.log(error);
    return responseApi.ErrorResponse(
      res,
      "error",
      error.message ? error.message : error
    );
  }
};

const logout = async (req, res, next) => {
  try {
    let { _id, email, username, roles, organization } = req.auth;
    let token = req.headers.authorization.split(" ")[1];
    const response = await User.find({ email: email });

    if (response.length !== 0 && response[0].token === token) {
      await User.updateOne({ token: token }, { token: "" }, { new: true });
      return responseApi.successResponseWithData(
        res,
        "You logged out successfully",
        "",
        StatusCodes.OK
      );
    } else {
      return responseApi.ErrorResponse(
        res,
        "Unauthorized User",
        "",
        StatusCodes.OK
      );
    }
  } catch (error) {
    return responseApi.ErrorResponse(
      res,
      "error",
      error.message ? error.message : error
    );
  }
};

const employee_details = async (req, res, next) => {
  try {
    let organization_data;
    let result = [];
    let { organization, email } = req.query;
    if (organization == "aiom") {
      organization_data = await User.find(
        { organization: organization },
        { username: 1, email: 1, roles: 1 }
      );
      if (!organization_data) {
        return responseApi.ErrorResponse(
          res,
          "unable to find Organization data.",
          organization_data,
          StatusCodes.NOT_FOUND
        );
      } else {
        for (let i = 0; i < organization_data.length; i++) {
          if (organization_data[i].email != email) {
            result.push(organization_data[i]);
          }
        }
        return responseApi.successResponseWithData(
          res,
          "found organization data",
          result,
          StatusCodes.OK
        );
      }
    } else {
      return responseApi.ErrorResponse(
        res,
        "organization has no name aiiom.",
        `no user found with this organization- ${organization}`,
        StatusCodes.BAD_REQUEST
      );
    }
  } catch (error) {
    return responseApi.ErrorResponse(
      res,
      "error",
      error.message ? error.message : error
    );
  }
};

// assigned bussiness manager or ad-Accound
const assigned_bm = async (req, res, next) => {
  try {
    let { assign_type, id, name, email } = req.body;
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
            if (
              assign_type === "assigned_BM" &&
              users_data[i].email === email[j].email
            ) {
              // when assigned_BM is empty.
              if (users_data[i].assigned_BM.length === 0) {
                bulkWriteOperations.push({
                  updateOne: {
                    filter: {
                      _id: users_data[i]._id,
                      email: users_data[i].email,
                    },
                    update: {
                      $push: {
                        [`${assign_type}`]: {
                          id: id,
                          name: name,
                          objectiveRole: email[j].role,
                        },
                      },
                    },
                  },
                });
              } else {
                for (let k = 0; k < users_data[i].assigned_BM.length; k++) {
                  if (
                    "id" in users_data[i].assigned_BM[k] &&
                    id === users_data[i].assigned_BM[k].id
                  ) {
                    // when assigned_BM is exist.
                    bulkWriteOperations.push({
                      updateOne: {
                        filter: {
                          _id: users_data[i]._id,
                          email: users_data[i].email,
                        },
                        update: {
                          // $set: { roles: email[j].role },
                          $set: {
                            [`${assign_type}`]: {
                              id: id,
                              name: name,
                              objectiveRole: email[j].role,
                            },
                          },
                        },
                      },
                    });
                  } else if (
                    "id" in users_data[i].assigned_BM[k] &&
                    id !== users_data[i].assigned_BM[k].id
                  ) {
                    // when assigned_BM is not exist.
                    bulkWriteOperations.push({
                      updateOne: {
                        filter: {
                          _id: users_data[i]._id,
                          email: users_data[i].email,
                        },
                        update: {
                          // $set: { roles: email[j].role },
                          $push: {
                            [`${assign_type}`]: {
                              id: id,
                              name: name,
                              objectiveRole: email[j].role,
                            },
                          },
                        },
                      },
                    });
                  }
                }
              }
            } else if (
              assign_type === "assigned_ad_account" &&
              users_data[i].email === email[j].email
            ) {
              if (users_data[i].assigned_ad_account.length === 0) {
                // when assigned_ad_account is empty.
                bulkWriteOperations.push({
                  updateOne: {
                    filter: {
                      _id: users_data[i]._id,
                      email: users_data[i].email,
                    },
                    update: {
                      $push: {
                        [`${assign_type}`]: {
                          id: id,
                          name: name,
                          objectiveRole: email[j].role,
                        },
                      },
                    },
                  },
                });
              } else {
                for (
                  let k = 0;
                  k < users_data[i].assigned_ad_account.length;
                  k++
                ) {
                  if (
                    "id" in users_data[i].assigned_ad_account[k] &&
                    id === users_data[i].assigned_ad_account[k].id
                  ) {
                    // when assigned_ad_account is exist.
                    bulkWriteOperations.push({
                      updateOne: {
                        filter: {
                          _id: users_data[i]._id,
                          email: users_data[i].email,
                        },
                        update: {
                          // $set: { roles: email[j].role },
                          $set: {
                            [`${assign_type}`]: {
                              id: id,
                              name: name,
                              objectiveRole: email[j].role,
                            },
                          },
                        },
                      },
                    });
                  } else if (
                    "id" in users_data[i].assigned_ad_account[k] &&
                    id !== users_data[i].assigned_ad_account[k].id
                  ) {
                    // when assigned_ad_account is not exist.
                    bulkWriteOperations.push({
                      updateOne: {
                        filter: {
                          _id: users_data[i]._id,
                          email: users_data[i].email,
                        },
                        update: {
                          // $set: { roles: email[j].role },
                          $push: {
                            [`${assign_type}`]: {
                              id: id,
                              name: name,
                              objectiveRole: email[j].role,
                            },
                          },
                        },
                      },
                    });
                  }
                }
              }
            } else {
              return responseApi.ErrorResponse(
                res,
                `assign_type must be one of {assigned_BM, assigned_BM} but we got ${assign_type}.`,
                [],
                StatusCodes.BAD_REQUEST
              );
            }
          }
        }
      }
      const result = await User.bulkWrite(bulkWriteOperations);
      if (result.matchedCount > 0 && result.modifiedCount > 0) {
        return responseApi.successResponseWithData(
          res,
          "User data Successfully updates!!",
          result,
          StatusCodes.OK
        );
      } else {
        return responseApi.ErrorResponse(
          res,
          "something went wrong!!",
          result,
          StatusCodes.BAD_REQUEST
        );
      }
    } else {
      return responseApi.ErrorResponse(
        res,
        "User data Not found !!",
        [],
        StatusCodes.NOT_FOUND
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

// update role API------
const role_update = async (req, res, next) => {
  try {
    let { email } = req.body;
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
                filter: {
                  _id: users_data[i]._id,
                  email: users_data[i].email,
                },
                update: {
                  $set: { roles: email[j].role },
                },
              },
            });
          }
        }
      }
      const result = await User.bulkWrite(bulkWriteOperations);
      if (result.matchedCount > 0 && result.modifiedCount > 0) {
        return responseApi.successResponseWithData(
          res,
          "User data Successfully updates!!",
          result,
          StatusCodes.OK
        );
      } else {
        return responseApi.ErrorResponse(
          res,
          "something went wrong!!",
          result,
          StatusCodes.BAD_REQUEST
        );
      }
    } else {
      return responseApi.ErrorResponse(
        res,
        "User data Not found !!",
        [],
        StatusCodes.NOT_FOUND
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

module.exports = {
  register,
  login,
  logout,
  employee_details,
  assigned_bm,
  role_update,
};
