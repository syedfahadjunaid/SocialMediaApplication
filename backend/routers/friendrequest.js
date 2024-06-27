// friendRequestRoutes.js
const express = require("express");
const router = express.Router();
const FriendRequest = require("../models/FriendRequestSchema");

// Create a FriendRequest
router.post("/friendRequests", async (req, res) => {
  const { fromUser, toUser } = req.body;
  const requestexist = await FriendRequest.findOne({
    $and: [{ toUser: toUser }, { fromUser: fromUser }],
  });
  if (requestexist) {
    return res.status(301).json({ message: "Friend request already send" });
  }
  try {
    if (!(fromUser || toUser)) {
      return res
        .status(404)
        .json({ message: "To user and from User is not exit" });
    }
    const newFriendRequest = await FriendRequest.create(req.body);
    res.status(201).json({
      message: "Friend Request created sucessfully",
      data: newFriendRequest,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all FriendRequests
router.get("/friendRequests", async (req, res) => {
  try {
    const friendRequests = await FriendRequest.find()
      .populate({ path: "fromUser", select: "-password -tokens" })
      .populate({ path: "toUser", select: "-password -tokens" })
      .exec();
    res.json(friendRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get a specific FriendRequest by ID
router.get("/friendRequests/:id", async (req, res) => {
  try {
    const friendRequest = await FriendRequest.findById(req.params.id)
      .populate({ path: "fromUser", select: "-password -tokens" })
      .populate({ path: "toUser", select: "-password -tokens" })
      .exec();
    if (!friendRequest) {
      return res.status(404).json({ error: "FriendRequest not found" });
    }
    res.json(friendRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/friendRequests-to-get/:toUserid", async (req, res) => {
  try {
    const friendRequest = await FriendRequest.find({
      toUser: req.params.toUserid,
    })
      .populate({ path: "fromUser", select: "-password -tokens" })
      .populate({ path: "toUser", select: "-password -tokens" })
      .exec();
    if (!friendRequest) {
      return res.status(404).json({ error: "FriendRequest not found" });
    }
    res.json(friendRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/friendRequests-send/:fromUser", async (req, res) => {
  try {
    const friendRequest = await FriendRequest.find({
      fromUser: req.params.fromUser,
    })
      .populate({ path: "fromUser", select: "-password -tokens" })
      .populate({ path: "toUser", select: "-password -tokens" })
      .exec();
    if (!friendRequest) {
      return res.status(404).json({ error: "FriendRequest not found" });
    }
    res.json(friendRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update a FriendRequest status by ID
router.put("/friendRequests/:id", async (req, res) => {
  try {
    const updatedFriendRequest = await FriendRequest.findByIdAndUpdate(
      req.params.id,
      { $set: { status: req.body.status } },
      { new: true }
    );
    if (!updatedFriendRequest) {
      return res.status(404).json({ error: "FriendRequest not found" });
    }
    res.json(updatedFriendRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a FriendRequest by ID
router.delete("/friendRequests/:id", async (req, res) => {
  try {
    const deletedFriendRequest = await FriendRequest.findByIdAndDelete(
      req.params.id
    );
    if (!deletedFriendRequest) {
      return res.status(404).json({ error: "FriendRequest not found" });
    }
    res.json({ message: "FriendRequest deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
