const mongoose = require("mongoose");

const UserstatusSchema = new mongoose.Schema({
        UserId: {type: String, },
        Status:{type:Boolean, default:false},
        Block :{type: Boolean, Default:false},
    },
    { timestamps: true },
); 
const UserStatus = mongoose.model("UserStatus", UserstatusSchema);
module.exports = UserStatus;