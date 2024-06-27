require("../db/conn");
const express = require("express");
const router = express.Router();
const Chatroom = require("../models/chatroomSchema");
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

route.post("/create-firebase-chatgroup", async (req, res) => {
    const { userID, FirebaseroomID, createdBy } = req.body;
    try {
        const createchatroom = new Chatroom({
            ChatroomId: 'chatroom' + generateUniqueId(),
            userID: userID,
            FirebaseroomID: FirebaseroomID,
            createdBy: createdBy,
        })
        await chertchatroom.save();
        if (!createchatroom) {
            res.status(404).json({ message: "Chatroom not find" });
        }
        res.status(201).json({ message: "Chatroom Created  successfully", data: createchatroom });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error", });
    }
})

router.get("/get-all-firebase-chatgroup", async (req, res) => {

    const Chatrooms = await Chatroom.find();
    if (!Chatrooms) {
        res.status(200).json({ message: "Chatroom is not find" });
    }
    res.status(200).json({ message: "All Comment get successfully", data: Chatrooms });
});

router.get("/get-one-chatroom/:id", async (req, res) => {
    const chatroomId = req.params.id;
    console.log("getOne", CommentId);
    console.log("get", req.params.id);
    try {
        const Singlechatroom = await Chatroom.findOne({ ChatroomId: chatroomId });

        if (!Singlechatroom) {
            return res.status(404).json({ error: "chat room is not persent of ".$chatroomId });
        }

        res.json({ SingleCommentId });
    } catch (error) {
        console.error("Error fetching Comment:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.put("/chatRoom-Update/:Id", async (req, res) => {
    const chatroomId = req.params.Id;
    const { FirebaseroomID, Userid } = req.body;

    try {
        const result = await Chatroom.updateOne(
            { ChatroomId: chatroomId, userID: Userid },
            { $set: { FirebaseroomID: FirebaseroomID,
                              userID : Userid,          
            } }
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

router.delete("/chatroom-delete/:Id", async (req, res) => {
    const chatroomId = req.params.Id;
    const { Userid } = req.body;
    try {
        const deletedChatroom = await Chatroom.findOneAndDelete({ ChatroomId: chatroomId, UserID: Userid });
        if (!deletedChatroom) {
            return res.status(403).json({ error: "You are not authorized to delete this chatroom" });
        }
        res.status(200).json({ message: "Chatroom deleted successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});