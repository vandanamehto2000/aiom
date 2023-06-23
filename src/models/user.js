const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: { type: String, default: '' },
    organization: { type: String, required: true },
    roles: { type: String, required: true, enum: ["admin", "business_owner", "employee","viewer"],default:"viewer" },
    facebook_token: { type: String },
    assigned_BM: [{
      id: { type: String },
      name: { type: String },
      objectiveRole: { type: String, required:true, enum: ["admin", "employee","viewer"], default:"viewer"}
    }],
    assigned_ad_account: [{
      id: { type: String },
      name: { type: String },
      objectiveRole: { type: String, required:true, enum: ["admin", "employee","viewer"], default:"viewer"}
    }]

  },
  { timestamps: true }
);


const User = mongoose.model("User", UserSchema);
module.exports = User;

