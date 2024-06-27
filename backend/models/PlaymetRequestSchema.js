const mongoose = require("mongoose");

const PlaymetRequestSchema = new mongoose.Schema({
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

const PlaymetRequest = mongoose.model("PlaymetRequest", PlaymetRequestSchema);

module.exports = PlaymetRequest;
