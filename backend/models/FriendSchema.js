const mongoose = require("mongoose");

const FriendSchema = new mongoose.Schema({
    FromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true,},
    ToUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true,},
    Friendfrom: { type: Date, default: Date.now,},
});

const Friends = mongoose.model("Friends", FriendSchema);

module.exports = Friends;
