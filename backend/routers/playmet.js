const express = require("express");
const router = express.Router();
const Playmets = require("../models/PlaymetSchema");


router.post('playmet/create',async(req, res)=>{
    const {FromUser , ToUser} =req.body;
    try {
        const playmentcheck = Playmets.find({ FromUser:FromUser, ToUser : ToUser,});
        if(playmentcheck){
            return res.status(405).json({message:"Playmat allraedy exit"});
        }
        const playmet = new Playmets({
            FromUser:FromUser,
            ToUser : ToUser,
        });
        await playmet.save();
        if(playmet){
            return res.status(201).json({massage:"Playmat created succfully", data:playmet});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({massage:"Internal server error"});  
    }
});

router.get('playmet/:touser',async(req,res)=>{
    const Touser = req.params.touser;
    try {
        const playmet = await Playmets.find({ToUser : Touser});
        if(!playmet){
            return res.status(404).json({message:"Playmat is not find"});
        }
        return res.status(200).json({message : "playmet data fatch succussfully" , data :playmet })

    } catch (error) {
        return res.status(500).json({massege:"Internal server error "});
    }
});

router.get('playmet/:fromuser',async(req,res)=>{
    const FromUser = req.params.fromuser;
    try {
        const playmet = await Playmets.find({FromUser : FromUser});
        if(!playmet){
            return res.status(404).json({message:"Playmat is not find"});
        }
        return res.status(200).json({message : "playmet data fatch succussfully" , data :playmet })

    } catch (error) {
        return res.status(500).json({massege:"Internal server error "});
    }
});

module.exports = router;