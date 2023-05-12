const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FacebookSchema = new mongoose.Schema(
    {
        token: { type: String, required: true, unique: true },
        app_id: { type: Number, required: false },
        app_secret: { type: String, required: false },
        ad_account_id: { type: String, required: true },
        account_id: { type: String, required: false },
        user_id: { type: Schema.Types.ObjectId, ref: 'User' }
    },
    { timestamps: true }
);


const Facebook = mongoose.model("Facebook", FacebookSchema);
module.exports = Facebook;
