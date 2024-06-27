const mongoose = require("mongoose");
const ForumstopicSchema = new mongoose.Schema(
  {
    topicId: { type: String },
    userId: { type: String },
    forumId: { type: String },
    forumCategory: { type: String },
    topic: { type: String },
  },
  { timestamps: true }
);
const Forumtopic = mongoose.model("Forumtopic", ForumstopicSchema);
module.exports = Forumtopic;
