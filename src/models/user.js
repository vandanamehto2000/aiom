const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: { type: String ,default:''},
  },
  { timestamps: true }
);


const model = mongoose.model("User", UserSchema);
module.exports = model;
