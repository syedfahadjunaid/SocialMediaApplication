require("../db/conn");
const express = require("express");
const router = express.Router();
const UserStatus = require("../models/UserstatusSchema");
const path = require("path");

router.get("/all-user-status", async (req, res) => {
  console.log("all user status");
  const allUserStatus = await UserStatus.find();
  res.send(allUserStatus);
});

router.get("/user-status/:userId", async (req, res) => {
  const userid = req.params.userId;
  try {
    const userstatus = await UserStatus.findOne({ UserId: userid });
    if (!userstatus) {
      return res.status(400).json({ message: "User status not find" });
    }
    return res
      .status(200)
      .json({ message: "user status get sucessfully ", data: userstatus });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/user/status/create", async (req, res) => {
  const { userID, status, Block } = req.body;
  try {
    const userstatus = new UserStatus({
      UserId: userID,
      Status: status,
      Block: Block,
    });
    await userstatus.save();
    if (!userstatus) {
      return res.status(400).json({ message: "User status not find" });
    }
    return res
      .status(200)
      .json({ message: "user status created sucessfully ", data: userstatus });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/user/update/status/:userId", async (req, res) => {
  const userId = req.params.userId;
  const { status } = req.body;
  try {
    const updatedUserStatus = await UserStatus.findOne({ UserId: userId });
    if (!updatedUserStatus) {
      return res.status(400).json({ message: "User status not found" });
    }
    if (status === true) {
      updatedUserStatus.Status = true;
    } else if (status === false) {
      updatedUserStatus.Status = false;
    }
    await updatedUserStatus.save();
    return res.status(200).send(updatedUserStatus);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/user/update/block/:userId", async (req, res) => {
  const userId = req.params.userId;
  const { Block } = req.body;
  try {
    const updatedUserblock = await UserStatus.findOne({ UserId: userId });
    if (!updatedUserblock) {
      return res.status(400).json({ message: "User status not found" });
    }
    if (Block === true) {
      updatedUserblock.Block = true;
    } else if (Block === false) {
      updatedUserblock.Block = false;
    }
    await updatedUserblock.save();
    return res.status(200).json({
      message: "User status updated successfully",
      userStatus: updatedUserblock,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
