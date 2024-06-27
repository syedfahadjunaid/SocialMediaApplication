const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const SECRET_KEY = process.env.SECRET_KEY;
// var secret = require(process.env.SECRET_KEY).secret;

// var crypto = require("crypto");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    username: { type: String },
    email: { type: String, required: true },
    contact: { type: String },
    password: { type: String, required: true },
    profileImage: { type: [String] },
    userId: { type: String, required: true },
    MaritalStatus: { type: String },
    address: { type: String },
    contry: { type: String },
    city: { type: String },
    pincode: { type: String },
    gender: { type: String, required: true },
    profile_type: { type: String },
    subscription_type: { type: String, required: true },
    Kink_Identity: { type: [String] },
    Orientation: { type: String },
    Aboutme: { type: String },
    Interests: { type: [String] },
    Enjoyed: { type: Object },
    PeymentDetails: { type: [String] },
    Dateofbirth: { type: String, required: true },

    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  console.log("hi from inside");
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

UserSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, SECRET_KEY);
    console.log("token response");
    this.tokens = this.tokens.concat({
      token: token,
    });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
