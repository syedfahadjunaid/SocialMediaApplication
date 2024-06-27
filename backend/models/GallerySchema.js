const mongoose = require("mongoose");
const GallerySchema = new mongoose.Schema({
  GalleryId: { type: String },
  GalleryName: { type: String },
  GalleryShortDiscription: { type: String },
  GalleryLink: { type: String },
  GalleryDiscrition: { type: String },
  GalleryCategory: { type: String },
  Galleryfile: { type: Object },
  Galleytype: { type: String },
  GalleryAddedbby: { type: String },
});
const Gallerys = mongoose.model("Gallerys", GallerySchema);
module.exports = Gallerys;
