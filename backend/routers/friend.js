const express = require("express");
const router = express.Router();
const Friends = require("../models/FriendSchema");


router.post('Friends/create',async(req, res)=>{
    const {FromUser , ToUser} =req.body;
    try {
        const friendcheck = Friends.find({ FromUser:FromUser, ToUser : ToUser,});
        if(friendcheck){
            return res.status(405).json({message:"Playmat allraedy exit"});
        }
        const friend = new Friends({
            FromUser:FromUser,
            ToUser : ToUser,
        });
        await friend.save();
        if(friend){
            return res.status(201).json({massage:"friend created succfully", data:friend});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({massage:"Internal server error"});  
    }
});

router.get('Friends/:touser',async(req,res)=>{
    const Touser = req.params.touser;
    try {
        const friends = await Friends.find({ToUser : Touser});
        if(!friends){
            return res.status(404).json({message:"friends is not find"});
        }
        return res.status(200).json({message : "friends data fatch succussfully" , data :friends })

    } catch (error) {
        return res.status(500).json({massege:"Internal server error "});
    }
});

router.get('Friends/:fromuser',async(req,res)=>{
    const FromUser = req.params.fromuser;
    try {
        const friends = await Friends.find({FromUser : FromUser});
        if(!friends){
            return res.status(404).json({message:"friends is not find"});
        }
        return res.status(200).json({message : "friends data fatch succussfully" , data :friends })
    } catch (error) {
        return res.status(500).json({massege:"Internal server error "});
    }
});

module.exports = router;