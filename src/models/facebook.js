const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FacebookSchema = new mongoose.Schema(
    // {
        // token: { type: String, required: true },
        // app_id: { type: Number, required: false },
        // app_secret: { type: String, required: false },
        // ad_account_id: { type: String, required: true },
        // account_id: { type: String, required: false },
        // facebook_user_id: { type: String, required: false },
        // user_id: { type: Schema.Types.ObjectId, ref: 'User' },
            {
                id: { type: String },
                name: { type: String },
                created_by: {
                    id: { type: String },
                    name: { type: String },
                    business: {
                        id: { type: String },
                        name: { type: String },
                    }
                },
                owned_ad_accounts: {
                    data: [
                        {
                            name: { type: String },
                            id: { type: String },
                        }
                    ],
                }
            },
        // }
     
    { timestamps: true }
);


const Facebook = mongoose.model("Facebook", FacebookSchema);
module.exports = Facebook;
