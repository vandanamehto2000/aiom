const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: { type: String, default: '' },
    organization: { type: String, required: true },
    roles: { type: String, required: true, enum: ["admin", "business_owner", "employee"] }
  },
  { timestamps: true }
);


const User = mongoose.model("User", UserSchema);
module.exports = User;
