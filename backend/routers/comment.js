require("../db/conn");
const express = require("express");
const router = express.Router();
const Comments = require("../models/commentSchema");
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
router.post("/create-Comments", async (req, res) => {
    const { Commentmassege, VideoId, UserID } = req.body;
    console.log(req.body);
    if (Commentmassege && VideoId && UserID) {
        try {
            const Comment = new Comments({
                CommentId: 'Comment' + generateUniqueId(),
                Comment: Commentmassege,
                VideoId: VideoId,
                UserID: UserID,
            });
            await Comment.save();
            res.status(201).json({ message: "Comments Created  successfully", data: Comment });
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Internal server error", });
        }
    } else {
        res.status(400).json({ error: "Comment,VideoId,UserID is not found ", });
    }
})

router.get("/get-all-Comment", async (req, res) => {

    const Comment = await Comments.find();
    if (!Comment) {
        res.status(200).json({ message: "Comment is not find" });
    }
    res.status(200).json({ message: "All Comment get successfully", data: Comment });
});
router.get("/get-one-comment/:id", async (req, res) => {
    const CommentId = req.params.id;
    console.log("getOne", CommentId);
    console.log("get", req.params.id);
    try {
        const SingleCommentId = await Comments.findOne({ CommentId: CommentId });

        if (!SingleCommentId) {
            return res.status(404).json({ error: "Comment not found" });
        }

        res.json({ SingleCommentId });
    } catch (error) {
        console.error("Error fetching Comment:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete("/Comment-delete/:CommentId", async (req, res) => {
    const CommentId = req.params.CommentId;
    const { Userid } = req.body;
    try {
        const deletedComments = await Comments.findOneAndDelete({ CommentId: CommentId, UserID: Userid });
        if (!deletedComments) {
            return res.status(403).json({ error: "You are not authorized to delete this comment" });
        }
        res.status(200).json({ message: "Comment deleted successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});


router.put("/Comments-Update/:CommentId", async (req, res) => {
    const CommentId = req.params.CommentId;
    const { Comment, Userid } = req.body;

    try {
        const result = await Comments.updateOne(
            { CommentId: CommentId, UserID: Userid },
            { $set: { Comment: Comment } }
        );
        if (result.n === 0) {
            return res.status(403).json({ error: "You are not authorized to update this comment or the comment does not exist" });
        }
        res.status(200).json({ message: "Comment updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Get all comments for a particular user
router.get("/get-comments-by-user/:UserId", async (req, res) => {
    const UserId = req.params.UserId;

    try {
        const userComments = await Comments.find({ UserID: UserId });

        if (!userComments || userComments.length === 0) {
            return res.status(404).json({ error: "No comments found for this user" });
        }

        res.status(200).json({ message: "User comments retrieved successfully", data: userComments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Get comments based on video ID
router.get("/get-comments-by-video/:VideoId", async (req, res) => {
    const VideoId = req.params.VideoId;

    try {
        const comments = await Comments.find({ VideoId: VideoId });

        if (!comments || comments.length === 0) {
            return res.status(404).json({ error: "No comments found for this video" });
        }

        res.status(200).json({ message: "Comments retrieved successfully", data: comments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;