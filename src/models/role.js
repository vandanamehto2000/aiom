const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ["admin", "business owner", "employee"]
    }
});


const Role = mongoose.model("Role", roleSchema);
module.exports = Role;
