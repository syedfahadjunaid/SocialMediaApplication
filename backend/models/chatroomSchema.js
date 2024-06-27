const mongoose = require("mongoose");
const chatroomSchema = new mongoose.Schema({
    ChatroomId: { type: String },
    userID: { type: [String] },
    FirebaseroomID: { type: String },
    createdBy: { type: String },
},
    { timestamps: true },
)
const Chatroom = mongoose.model("Chatroom", chatroomSchema);
module.exports = Chatroom;