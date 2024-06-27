require("../db/conn");
const express = require("express");
const router = express.Router();
const Forumtopic = require("../models/ForumstopicSchema");
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

router.post("/create-forum-topic", async (req, res) => {
  const { topics, category, ForumID, UserID } = req.body;
  console.log(req.body);
  if (topics && ForumID && UserID) {
    try {
      const topic = new Forumtopic({
        topicId: "Forumstopic" + generateUniqueId(),
        topic: topics,
        forumId: ForumID,
        userId: UserID,
        forumCategory: category,
      });
      await topic.save();
      const comment = new Forumscomment({
        commentId: "Forumscomment" + generateUniqueId(),
        forumTopicId: topic.topicId,
        userId: topic.userId,
        forumId: topic.forumId,
        comment:
          "'" + topic.topic + "'" + " " + "discussion has been created!!!",
      });
      await comment.save();
      res
        .status(201)
        .json({ message: "Forumstopics Created  successfully", data: topic });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res
      .status(400)
      .json({ error: "Forums-topics,VideoId,UserID is not found " });
  }
});

router.get("/get-all-forum-topic", async (req, res) => {
  const topic = await Forumtopic.find();
  if (!topic) {
    res.status(200).json({ message: "Forumtopic is not find" });
  }
  res
    .status(200)
    .json({ message: "All Forumtopic get successfully", data: topic });
});
router.get("/get-one-forum-topic/:id", async (req, res) => {
  const TopicId = req.params.id;
  console.log("getOne", TopicId);
  console.log("get", req.params.id);
  try {
    const SingleTopicId = await Forumtopic.findOne({ topicId: TopicId });

    if (!SingleTopicId) {
      return res.status(404).json({ error: "Forumtopic not found" });
    }

    res.json({ SingleTopicId });
  } catch (error) {
    console.error("Error fetching Forumscomment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
