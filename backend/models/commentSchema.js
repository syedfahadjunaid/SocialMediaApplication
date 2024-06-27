const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    CommentId:{type:String},
    Comment:{type:String},
    VideoId:{type:String},
    UserID:{type:String},
},
{ timestamps: true },
)
const Comments =  mongoose.model("Comments", CommentSchema);
module.exports = Comments;
