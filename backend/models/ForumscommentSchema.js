const mongoose = require("mongoose");
const ForumscommentSchema = new mongoose.Schema(
  {
    userId: { type: String },
    forumId: { type: String },
    commentId: { type: String },
    comment: { type: String },
    forumTopicId: { type: String },
  },
  { timestamps: true }
);
const Forumscomment = mongoose.model("Forumscomment", ForumscommentSchema);
module.exports = Forumscomment;
