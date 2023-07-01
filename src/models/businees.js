const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BusinessDetails = new mongoose.Schema(
    {
        id: { type: String },
        name: { type: String },
        app_id: { type: Number, required: false },
        facebook_token: { type: String, required: false },
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

        owned_ad_accounts: [
            {
                name: { type: String },
                id: { type: String },
            }
        ],
    },

    { timestamps: true }
);


const BUSINESS = mongoose.model("BUSINESS", BusinessDetails);
module.exports = BUSINESS;
