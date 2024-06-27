const mongoose = require("mongoose");
const ForumsSchema = new mongoose.Schema({
    ForumsId :{type:String},
    ForumsName:{type:String},
    Discription:{type:String}

},
{ timestamps: true },
)

const Forums = mongoose.model("Forums", ForumsSchema);
module.exports = Forums