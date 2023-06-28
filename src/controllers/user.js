const CryptoJS = require("crypto-js");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const responseApi = require("../utils/apiresponse");
const { updateOne } = require("../models/businees");
const nodemailer = require("nodemailer");
const axios = require("axios");

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
    let userData = await User.create(newUser);
    return responseApi.successResponseWithData(
      res,
      "User created successfully",
      userData,
      StatusCodes.CREATED
    );
  } catch (err) {
    err.code === 11000
      ? responseApi.ErrorResponse(
        res,
        "User Already Registered",
        req.body.email,
        StatusCodes.BAD_REQUEST
      )
      : responseApi.ErrorResponse(
        res,
        "error",
        err.message ? err.message : err
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
        `${req.body.email} email does not exist `,
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

      organization_data = await User.find(
        { organization: organization },
        { username: 1, email: 1, roles: 1, assigned_BM: 1, assigned_ad_account: 1 }
      );
      if (!organization_data) {
        return responseApi.ErrorResponse(
          res,
          "unable to find Organization data.",
          "No User with this organization",
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
      if (id !== "" && name !== "") {
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
      }
      else {
        return responseApi.ErrorResponse(
          res,
          "Enter correct id and name",
          "Enter correct id and name",
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


const delete_bm = async (req, res, next) => {
  try {
    let { assign_type, id, email } = req.body;

    const users_data = await User.find({ email: { $in: email } });
    if (users_data.length > 0) {
      const bulkWriteOperations = [];
      for (let i = 0; i < users_data.length; i++) {
        bulkWriteOperations.push({
          updateOne: {
            filter: { _id: users_data[i]._id, email: users_data[i].email },
            update: {
              $pull: {
                [`${assign_type}`]: {
                  id: id
                },
              },
            },
          },
        });
      }
      const result = await User.bulkWrite(bulkWriteOperations);
      return responseApi.successResponseWithData(
        res,
        "User data Successfully deleted!!",
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

}

const add_users = async (req, res, next) => {
  try {
    let { receiver_email, organization, role } = req.body

    //nodemailer transporter using Gmail service
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });
  
    const pass = await register_generate_password(receiver_email,organization,role);
    if(pass.status !=='success'){
      return responseApi.ErrorResponse(res,"registration failed", pass.data)
    }

    let password = pass.data.password
    // Compose email message
    const emailOptions = {
      from: process.env.EMAIL,
      to: receiver_email,
      subject: 'Invitation to join our platform AIOM',
      text: `Hello!\n\nYou have been invited to join our platform. Please click on the following link to accept the invitation:`,
      html: `<p>Hello!</p><p>You have been invited to join our platform. Please click on the following link to Login: <a href="http://3.108.227.8:3000/login">AIOM LOGIN</a></p><p>Your System Generated Password is ${password}</p><p>Use your EMAIL and this Password to login.</p><p>Regards</p><p>AIOM TEAM</p>`
    };

    // Send the email
    const info = await transporter.sendMail(emailOptions);
  
    if(info.messageId){
      return responseApi.successResponseWithData(res,"Mail send Successfully",`Mail sent with message id ${info.messageId}`)
    }else{
      return responseApi.ErrorResponse(res,"Error Sending Mail", info)
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

async function register_generate_password(email, organization, role) {
  try {
    let randomPassword = generateRandomPassword(8)
  let data = JSON.stringify({
    "username": email.split("@")[0],
    "email": email,
    "password": randomPassword,
    "organization": organization,
    "roles": role
  });
  
  


  const newUser = {
    username: email.split("@")[0],
    email: email,
    password: CryptoJS.AES.encrypt(
      randomPassword,
      process.env.PASS_SECRET
    ).toString(),
    organization: organization,
    roles: role
  };

    let userData = await User.create(newUser);
    
    if(!userData){
      return {
        status:"error",
        data: "Error Registering User"
      }
    }
    return {
      status:"success",
      data: {
        password:randomPassword
      }
    }

  // if(registered_data?.data.status ==="success"){
  //   return {
  //     status:"success",
  //     data: {password:randomPassword}
  //   }
  // }else{
  //   return {
  //     status:"error",
  //     data: registered_data.data
  //   }
  // }
  } catch (error) {
    console.log(error.message)
   
    return {
      status:"error",
      data: error.code === 11000 ? "Invite Already Sent": error.message
    }
  }
}



function generateRandomPassword(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';

  for (let i = 0; i < length; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return password;
}
// add_users()

module.exports = { register, login, logout, employee_details, assigned_bm, role_update, delete_bm, add_users };
