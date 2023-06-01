const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BusinessSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        primary_page: { type: String, required: true },
        Business_id: { type: String, required: true },
        ad_account_ids: [{
            name: { type: String, required: true },
            ad_account_id: { type: String, required: true }
        }],
        user_id: { type: Schema.Types.ObjectId, ref: 'User' }
    },
    { timestamps: true }
);


const Business = mongoose.model("Business", BusinessSchema);
module.exports = Business;
