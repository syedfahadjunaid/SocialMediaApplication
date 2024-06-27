require("../db/conn");
const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

require("../db/conn");
const User = require("../models/UserSchema");
// const Authenticate = require("../middleware/authenticate");
const multer = require("multer");
const path = require("path");

function generateUniqueId() {
  const date = new Date();
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

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

router.post("/userRegister", upload.array("profileImage"), async (req, res) => {
  const {
    name,
    username,
    email,
    MaritalStatus,
    contry,
    city,
    pincode,
    Orientation,
    Aboutme,
    Interests,
    Enjoyed,
    PeymentDetails,
    password,
    profile_type,
    subscription_type,
    address,
    Kink_Identity,
    contact,
    gender,
    Dateofbirth,
  } = req.body;
  const fileNames = req.files?.map((file) => file.filename);
  console.log(fileNames);
  if (!email || !password) {
    return res.status(422).json({
      error: "Please fill the fields properly",
    });
  }
  try {
    const userExist = await User.findOne({ email: email });
    console.log(userExist);
    if (userExist) {
      return res.status(422).json({ error: "Email already exists" });
    }
    const user2 = new User({
      name,
      username,
      email,
      MaritalStatus,
      contry,
      city,
      pincode,
      Orientation,
      Aboutme,
      Interests,
      Enjoyed,
      PeymentDetails,
      password,
      profile_type,
      subscription_type,
      address,
      Kink_Identity,
      contact,
      gender,
      Dateofbirth,
      profileImage: fileNames ? fileNames : "",
      userId: "Cust" + generateUniqueId(),
      userCreateDate: new Date(),
      userUpdateDate: new Date(),
    });
    await user2.save();
    console.log(user2);
    res.status(200).json(user2);
    // res.status(201).json({ message: "User register successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.post("/signin", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "plz filled the data" });
    }
    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      token = await userLogin.generateAuthToken();
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 86400000),
        httpOnly: true,
      });
      if (!isMatch) {
        res.status(400).json({ error: "invalid credentials" });
      } else {
        res.json({ message: "user Signin successfully", userData: userLogin });
      }
    } else {
      res.status(400).json({ error: "invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/getUserData", async (req, res) => {
  console.log("this is about page");
  const users = await User.find();
  res.send(users);
});

// Delete
router.delete("/deleteUser/:userId", async (req, res) => {
  console.log("Delete User");
  const userId = req.params._id;
  //   const updates = req.body;
  try {
    const deletedUser = await User.findOneAndDelete({
      userId: userId,
    });
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/userUpdate/:userId", async (req, res) => {
  const userId = req.params.userId;
  const {
    name,
    Email,
    // password,
    profile_type,
    subscription_type,
    // sexual_orientation,
    address,
    Kink_Identity,
    contact,
    gender,
    pincode,
    city,
    contry,
    orientation,
    Aboutme,
    Interests,
    Enjoyed,
    PeymentDetails,
    MaritalStatus,
    Dateofbirth,

    Username,
  } = req.body;
  try {
    const userExist = await User.findOne({
      email: Email,
    });
    const userUserNameExist = await User.findOne({
      username: Username,
    });
    console.log(userExist);
    console.log(userUserNameExist);
    if (userUserNameExist) {
      if (userUserNameExist.email !== Email) {
        return res
          .status(422)
          .json({ error: "Username or email already exists " });
      }
    }

    const adminToUpdate = await User.findById(userId);
    if (!adminToUpdate) {
      return res.status(404).json({ error: "userId not found" });
    }
    adminToUpdate.name = name;
    adminToUpdate.username = Username;
    adminToUpdate.email = Email;
    adminToUpdate.contact = contact;
    // adminToUpdate.password = password;
    adminToUpdate.profile_type = profile_type;
    adminToUpdate.subscription_type = subscription_type;
    // adminToUpdate.sexual_orientation = sexual_orientation;
    adminToUpdate.address = address;
    adminToUpdate.Kink_Identity = Kink_Identity;
    adminToUpdate.gender = gender;
    adminToUpdate.Dateofbirth = Dateofbirth;
    adminToUpdate.pincode = pincode;
    adminToUpdate.city = city;
    adminToUpdate.contry = contry;
    adminToUpdate.Aboutme = Aboutme;
    adminToUpdate.gender = gender;
    adminToUpdate.Enjoyed = Enjoyed;
    adminToUpdate.Interests = Interests;
    adminToUpdate.PeymentDetails = PeymentDetails;
    adminToUpdate.MaritalStatus = MaritalStatus;
    adminToUpdate.Orientation = orientation;

    await adminToUpdate.save();

    return res.status(200).json({ message: "userId updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/userPasswordUpdate/:userId", async (req, res) => {
  const userId = req.params.userId;
  const { Password } = req.body;
  try {
    const adminToUpdate = await User.findById(userId);
    // console.log(adminToUpdate);
    if (!adminToUpdate) {
      return res.status(404).json({ error: "userId not found" });
    }
    adminToUpdate.password = Password;
    await adminToUpdate.save();
    return res.status(200).json({ message: "password updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.put(
  "/user-profile-update/:userId",
  upload.array("profileImage"),
  async (req, res) => {
    try {
      const userId = req.params.userId;
      const fileNames = req.files?.map((file) => file.filename);
      console.log(fileNames);
      const uerProfileImageUpdate = await User.findById(userId);
      if (!uerProfileImageUpdate) {
        return res.status(404).json({ message: "User not find" });
      }
      uerProfileImageUpdate.profileImage = fileNames;
      await uerProfileImageUpdate.save();
      return res.status(200).json({
        message: "Profile picture update sucessfully ",
        data: uerProfileImageUpdate.profileImage,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.delete("/userLogout", async (req, res) => {
  res.clearCookie("jwtoken", { path: "/" });
  res.send("User Logout Successfully");
});

router.delete("/userLogout/:tokenId", async (req, res) => {
  try {
    const tokenIdToDelete = req.params.tokenId;
    // Assuming you have the admin ID from the authenticated request
    const { userId } = req.body; // Replace with your actual method of extracting admin ID
    console.log(userId);
    console.log(tokenIdToDelete);
    // Find the admin by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    // Use $pull to remove the token with the specified ID from the tokens array
    res.clearCookie("jwtoken", { path: "/" });
    user.tokens = user.tokens.filter(
      (tokenObj) => tokenObj.token.toString() !== tokenIdToDelete
    );
    // Save the updated admin document
    await user.save();
    res.status(200).json({ message: "user logout successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// router.delete("/userLogout/:tokenId", async (req, res) => {
//   try {
//     const tokenIdToDelete = req.params.tokenId;
//     // Assuming you have the admin ID from the authenticated request
//     const { userId } = req.body; // Replace with your actual method of extracting admin ID
//     console.log(userId);
//     console.log(tokenIdToDelete);
//     // Find the admin by ID
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "user not found" });
//     }
//     // Use $pull to remove the token with the specified ID from the tokens array
//     res.clearCookie("jwtoken", { path: "/" });
//     user.tokens = user.tokens.filter(
//       (tokenObj) => tokenObj._id.toString() !== tokenIdToDelete
//     );
//     // Save the updated admin document
//     await user.save();
//     res.status(200).json({ message: "user logout successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

router.get("/user/:userId", async (req, res) => {
  const userID = req.params.userId;
  try {
    const users = await User.findOne({ userId: userID });
    if (!users) {
      return res.status(404).json({ error: "userID not found" });
    }
    console.log("userID information for ID", userID, ":", users.name);
    res.json({ users }); // Send the Review as JSON response
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
