const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PageSchema = new mongoose.Schema(
    {
        page_id:{type:String,required:true},
        
    },
    { timestamps: true }
);


const Page = mongoose.model("Page", PageSchema);
module.exports = Page;