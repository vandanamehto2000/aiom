const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: { type: String, default: '' },
    roles: { type: Schema.Types.ObjectId, ref: "Role" }
  },
  { timestamps: true }
);


const User = mongoose.model("User", UserSchema);
module.exports = User;
