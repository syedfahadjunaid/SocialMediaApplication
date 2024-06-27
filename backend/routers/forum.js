require("../db/conn");
const express = require("express");
const router = express.Router();
const Forums = require("../models/ForumsSchema");
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
router.post("/create-forums", async (req, res) => {
  const { Forumstitles, Discription } = req.body;
  console.log(req.body);
  if (Forumstitles) {
    try {
      const forum = new Forums({
        ForumsId: "forum" + generateUniqueId(),
        ForumsName: Forumstitles,
        Discription: Discription,
      });
      await forum.save();
      res
        .status(201)
        .json({ message: "Forums Created  successfully", data: forum });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(400).json({ error: "Forumstitles is not found " });
  }
});

router.get("/get-all-forum", async (req, res) => {
  const forums = await Forums.find();
  if (!forums) {
    res.status(200).json({ message: "Forums is not find" });
  }
  res
    .status(200)
    .json({ message: "All Forums get successfully", data: forums });
});
router.get("/get-one-forum/:id", async (req, res) => {
  const forumId = req.params.id;
  console.log("getOne", forumId);
  console.log("get", req.params.id);
  try {
    const Singleforum = await Forums.findOne({ ForumsId: forumId });

    if (!Singleforum) {
      return res.status(404).json({ error: "forum not found" });
    }

    res.json({ Singleforum });
  } catch (error) {
    console.error("Error fetching forum:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/forums-delete/:ForumId", async (req, res) => {
  const ForumId = req.params.ForumId;
  try {
    const deletedForum = await Forums.findOneAndDelete({ ForumsId: ForumId });
    if (!deletedForum) {
      return res.status(404).json({ error: "Forums not found" });
    }
    res.status(200).json({ message: "Forums deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/Forums-Update/:ForumsId", async (req, res) => {
  const ForumsId = req.params.ForumsId;
  const { Forumstitles, Discription } = req.body;
  console.log(Forumstitles, "update");

  try {
    const result = await Forums.updateOne(
      { ForumsId: ForumsId },
      {
        $set: {
          ForumsName: Forumstitles,
          Discription: Discription,
        },
      }
    );

    if (result.n === 0) {
      return res.status(404).json({ error: "Forums not found" });
    }

    res.status(200).json({ message: "Forums updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
