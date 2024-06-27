require("../db/conn");
const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

require("../db/conn");
const Gallerys = require("../models/GallerySchema");
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

router.post("/add-Gallery", upload.array('Galleryfile'), async (req, res) => {
    const {
        GalleryName,
        GalleryShortDiscription,
        GalleryLink,
        GalleryDiscrition,
        GalleryCategory,
        Galleytype,
        GalleryAddedbby
    } = req.body;
    const fileNames = req.files?.map(file => file.filename);
    console.log(fileNames);

    if (
        !GalleryName ||
        !GalleryCategory ||
        !GalleryAddedbby
    ) {
        return res.status(422).json({
            error: "Please fill the fields properly",
        });
    }

    try {
        const Gallery = new Gallerys({
            GalleryId: 'gallery' + generateUniqueId(),
            GalleryName: GalleryName,
            GalleryShortDiscription: GalleryShortDiscription,
            GalleryLink: GalleryLink,
            GalleryDiscrition: GalleryDiscrition,
            GalleryCategory: GalleryCategory,
            Galleryfile: fileNames,
            Galleytype: Galleytype,
            GalleryAddedbby: GalleryAddedbby,
        });
        await Gallery.save();
        res.status(201).json({ message: "Gallery added successfully", });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error", });
    }
});

router.get("/get-all-Gallery", async (req, res) => {

    const Gallery = await Gallerys.find();
    if (!Video) {
        res.status(200).json({ message: "Gallerys is not find" });
    }
    res.status(200).json({ message: "All Gallery get successfully", data: Gallery });
});
router.get("/get-one-user-Gallery/:userId", async (req, res) => {
    try {
        const userId = req.params.id;
        const Gallery = await Gallerys.find({ GalleryAddedbby: userId })
        if (!Gallery) {
            res.status(200).json({ message: "Gallery is not find" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.put("/upadte-Gallery/:galleryId", upload.array('Galleryfile'), async (req, res) => {
    const GalleryId = req.params.galleryId;
    const { GalleryName,
            GalleryShortDiscription,
            GalleryLink,
            GalleryDiscrition,
            GalleryCategory,
            Galleytype,
            userid } = req.body;
    const fileNames = req.files?.map(file => file.filename);
    try {
        const result = await Gallerys.findOneAndUpdate(
            { GalleryId: GalleryId, GalleryAddedbby: userid }, {
                $set: {
                    GalleryName: GalleryName,
                    GalleryShortDiscription: GalleryShortDiscription,
                    GalleryLink: GalleryLink,
                    GalleryDiscrition: GalleryDiscrition,
                    GalleryCategory: GalleryCategory,
                    Galleryfile: fileNames,
                    Galleytype: Galleytype,
                }
            }
        );
        if (result.n === 0) {
            return res.status(404).json({ error: "Gallery not found" });
        }
        res.status(200).json({ message: "Gallery updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.delete("/gallerys-delete/:GalleryId", async (req, res) => {
    const GalleryId = req.params.GalleryId;
    const{userID} = req.body;
    try {
        const deletedGallery = await Gallerys.findOneAndDelete({ GalleryId: GalleryId ,GalleryAddedbby: userID });
        if (!deletedGallery) {
            return res.status(404).json({ error: "Gallery not found" });
        }
        res.status(200).json({ message: "Gallery deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
module.exports = router;