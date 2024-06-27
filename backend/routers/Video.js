require("../db/conn");
const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

require("../db/conn");
const Videos = require("../models/videoSchema");
// const Authenticate = require("../middleware/authenticate");
const multer = require('multer');
const path = require('path');

function generateUniqueId() {
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    const uniqueId = `${year}${month}${day}${hours}${minutes}${seconds}`;

    return uniqueId;
}
const storage = multer.diskStorage({
    destination: "./backend/uploads/",
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});
const upload = multer({ storage });

router.post("/add-video", upload.array('Videofile'), async (req, res) => {
    const {
        VideoName,
        VideoShortDiscription,
        VideoLink,
        VideoDiscrition,
        VideoCategory,
        Videotype,
        VideoAddedbby
    } = req.body;
    const fileNames = req.files?.map(file => file.filename);
    console.log(fileNames);

    if (
        !VideoName ||
        !VideoCategory ||
        !VideoAddedbby
    ) {
        return res.status(422).json({
            error: "Please fill the fields properly",
        });
    }

    try {
    
        const Video = new Videos({
            VideoId:VideoId,
            VideoName:VideoName,
            VideoShortDiscription:VideoShortDiscription,
            VideoLink:VideoLink,
            VideoDiscrition:VideoDiscrition,
            VideoCategory:VideoCategory,
            Videofile:fileNames,
            Videotype:Videotype,
            VideoAddedbby:VideoAddedbby,
        });
        await Video.save();
        res.status(201).json({ message: "Video added successfully", });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error", });
    }
});

router.get("/get-all-Video", async (req, res) => {

    const Video = await Videos.find();
    if (!Video) {
        res.status(200).json({ message: "Videos is not find" });
    }
    res.status(200).json({ message: "All Videos get successfully", data: Video });
});
router.get("/get-one-user-video/:userId", async(req, res)=>{
    try {
        const userId = req.params.id;
        const Video = await Videos.find({VideoAddedbby:userId})
        if(!Video){
            res.status(200).json({ message: "Videos is not find" }); 
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.put("/upadte-Gallery/:videoId", upload.array('Videofile'), async (req, res) => {
    const VideoId = req.params.videoId;
    const { VideoName,
            VideoShortDiscription,
            VideoLink,
            VideoDiscrition,
            VideoCategory,
            Videotype,
            userid } = req.body;
    const fileNames = req.files?.map(file => file.filename);
    try {
        const result = await Videos.findOneAndUpdate(
            { VideoId: VideoId, VideoAddedbby: userid }, {
                $set: {
                    VideoName: VideoName,
                    VideoShortDiscription: VideoShortDiscription,
                    VideoLink: VideoLink,
                    VideoDiscrition: VideoDiscrition,
                    VideoCategory: VideoCategory,
                    Videofile: fileNames,
                    Videotype: Videotype,
                }
            }
        );
        if (result.n === 0) {
            return res.status(404).json({ error: "Video not found" });
        }
        res.status(200).json({ message: "Video updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.delete("/Videos-delete/:VideoId", async (req, res) => {
    const VideoId = req.params.VideoId;
    const{userID} = req.body;
    try {
        const deletedVideo = await Videos.findOneAndDelete({ VideoId: VideoId ,VideoAddedbby:userID });
        if (!deletedVideo) {
            return res.status(404).json({ error: "Video not found" });
        }
        res.status(200).json({ message: "Video deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
module.exports = router;