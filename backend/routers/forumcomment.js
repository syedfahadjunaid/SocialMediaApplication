require("../db/conn");
const express = require("express");
const router = express.Router();
const Forumscomment = require("../models/ForumscommentSchema");
const path = require("path");

function generateUniqueId() {
  const date = new Date();
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  const uniqueId = `${year}${month}${day}${hours}${minutes}${seconds}`;

  return uniqueId;
}

router.post("/create-forum-comments", async (req, res) => {
  const { Commentmessage, forumId, UserID, topicId } = req.body;
  console.log(req.body);
  if (Commentmessage && forumId && UserID && topicId) {
    try {
      const Comment = new Forumscomment({
        commentId: "Forumscomment" + generateUniqueId(),
        comment: Commentmessage,
        forumId: forumId,
        userId: UserID,
        forumTopicId: topicId,
      });
      await Comment.save();
      res.status(201).json({
        message: "Forumscomment Created  successfully",
        data: Comment,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res
      .status(400)
      .json({ error: "Forumscomment,VideoId,UserID is not found " });
  }
});

router.get("/get-all-forum-Comment", async (req, res) => {
  const Comment = await Forumscomment.find();
  if (!Comment) {
    res.status(200).json({ message: "Forumscomment is not find" });
  }
  res
    .status(200)
    .json({ message: "All Forumscomment get successfully", data: Comment });
});
router.get("/get-one-comment/:id", async (req, res) => {
  const CommentId = req.params.id;
  console.log("getOne", CommentId);
  console.log("get", req.params.id);
  try {
    const SingleCommentId = await Forumscomment.findOne({
      commentId: CommentId,
    });

    if (!SingleCommentId) {
      return res.status(404).json({ error: "Forums comment not found" });
    }

    res.json({ SingleCommentId });
  } catch (error) {
    console.error("Error fetching Forumscomment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/forum-comment-delete/:CommentId", async (req, res) => {
  const CommentId = req.params.CommentId;
  const { Userid } = req.body;
  try {
    const deletedComments = await Forumscomment.findOneAndDelete({
      CommentId: CommentId,
      UserID: Userid,
    });
    if (!deletedComments) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this comment" });
    }
    res.status(200).json({ message: "Forumscomment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/forum-comments-Update/:CommentId", async (req, res) => {
  const CommentId = req.params.CommentId;
  const { Comment, Userid } = req.body;

  try {
    const result = await Comments.updateOne(
      { CommentId: CommentId, UserID: Userid },
      { $set: { Comment: Comment } }
    );
    if (result.n === 0) {
      return res.status(403).json({
        error:
          "You are not authorized to update this comment or the comment does not exist",
      });
    }
    res.status(200).json({ message: "Forumscomment updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
