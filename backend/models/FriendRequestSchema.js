const mongoose = require("mongoose");

const FriendRequestSchema = new mongoose.Schema({
    fromUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    toUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
    },
    sentAt: {
        type: Date,
        default: Date.now,
    },
});

const FriendRequest = mongoose.model("FriendRequest", FriendRequestSchema);

module.exports = FriendRequest;
