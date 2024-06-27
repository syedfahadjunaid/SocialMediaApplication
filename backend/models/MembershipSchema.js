const mongoose = require("mongoose");

const MembershipSchema = new mongoose.Schema({
    MembershipId:{type:String},
    Membership:{type:String},
    Price:{type:Number},
    Membershiptype:{type:Number},
})
const Memberships =  mongoose.model("Memberships", MembershipSchema);
module.exports = Memberships;
