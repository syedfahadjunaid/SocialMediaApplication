const mongoose = require("mongoose");
const VideoSchema = new mongoose.Schema(
{
    VideoId:{type:String},
    VideoName:{type:String},
    VideoShortDiscription:{type:String},
    VideoLink:{type:String},
    VideoDiscrition:{type:String},
    VideoCategory:{type:String},
    Videofile:{type:String},
    Videotype:{type:String},
    VideoAddedbby:{type:String}
})
const Videos = mongoose.model("Videos", VideoSchema);
module.exports = Videos;
