const mongoose = require("mongoose");

const PlaymetSchema = new mongoose.Schema({
    FromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true,},
    ToUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true,},
    Playmentfrom: { type: Date, default: Date.now,},
});

const Playmets = mongoose.model("Playmets", PlaymetSchema);

module.exports = Playmets;
