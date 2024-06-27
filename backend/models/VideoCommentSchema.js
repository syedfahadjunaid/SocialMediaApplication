const mongoose = require("mongoose");
const VideoCommentSchema = new mongoose.Schema({
    useId:{type:String},
    videoId:{type:String},
    commentId:{type:String},
    comment:{type:String},
})
const VideoComment = mongoose.model("VideoComment", VideoCommentSchema);
module.exports = VideoComment;