const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PageSchema = new mongoose.Schema(
    {
        facebook_id: { type: Schema.Types.ObjectId, ref: 'Facebook' },
        page_id: { type: String, required: true },

    },
);


const Page = mongoose.model("Page", PageSchema);
module.exports = Page;