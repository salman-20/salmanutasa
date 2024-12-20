import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import videoModel from "./Models/videoModel.js";
import userModel from "./Models/userModel.js";
import courseModel from "./Models/courseModel.js";
import bcrypt from "bcryptjs";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import * as ENV from "./config.js";

const app = express();
app.use(express.json());
app.use(cors());

const port = ENV.PORT || 4001;
app.listen(port, () => {
  console.log(`Connected with ${port}`);
});

const constring = `mongodb+srv://${ENV.DB_USER}:${ENV.DB_PASSWORD}@${ENV.DB_CLUSTER}/${ENV.DB_NAME}?retryWrites=true&w=majority&appName=cweb`;

mongoose.connect(constring);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

app.use("/uploads", express.static(__dirname + "/uploads"));

const upload = multer({ storage: storage });

app.post("/registerUser", async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const datebirth = req.body.datebirth;
    const hpassword = await bcrypt.hash(password, 10);

    const checkuser = await userModel.findOne({ email: email });
    if (checkuser) {
      return res.status(404).json({ msg: "Email Already Exists..." });
    }

    const user = new userModel({
      name: name,
      email: email,
      password: hpassword,
      datebirth: datebirth,
    });
    await user.save();
    res.status(200).json({ user: user, msg: "Registration Successful..." });
  } catch (error) {
    res.status(500).json({ msg: "There is Error..." });
  }
});

app.post("/loginUser", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ msg: "User Not Found.." });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(404).json({ msg: "Wrong Password Entered.." });
    }

    res.status(200).json({ user: user, msg: "Login Successful.." });
  } catch (error) {
    res.status(500).json({ msg: "There is Error..." });
  }
});

app.post("/logoutUser", async (req, res) => {
  try {
    res.status(200).json({ msg: "Logout Successful.." });
  } catch (error) {
    res.status(500).json({ msg: "There is Error.." });
  }
});

app.put("/resetPassoword", async (req, res) => {
  try {
    const email = req.body.email;
    const datebirth = req.body.datebirth;
    const password = req.body.password;

    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ msg: "User Not Found.." });
    }

    if (user.datebirth !== datebirth) {
      return res.status(400).json({ msg: "Invalid date of birth" });
    }
    const hpassword = await bcrypt.hash(password, 10);
    user.password = hpassword;
    await user.save();
    res.status(200).json({ user: user, msg: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ msg: "There is Error.." });
  }
});

app.put(
  "/updateUserProfile/",
  upload.single("profilePic"),
  async (req, res) => {
    const { email, name, datebirth } = req.body;

    try {
      const userToUpdate = await userModel.findOne({ email });

      if (!userToUpdate) {
        return res.status(404).json({ msg: "User not found" });
      }

      let profilePic = userToUpdate.profilePic;

      if (req.file) {
        profilePic = req.file.filename;

        // Check if the current profile picture is not the default image
        if (userToUpdate.profilePic && userToUpdate.profilePic !== "img.png") {
          const oldFilePath = path.join(
            __dirname,
            "uploads",
            userToUpdate.profilePic
          );

          try {
            await fs.promises.unlink(oldFilePath);
            console.log("Old file deleted successfully");
          } catch (err) {
            console.error("Error deleting old profile picture:", err);
            return res
              .status(500)
              .json({ msg: "Error deleting old profile picture" });
          }
        }
      }

      // Update user fields
      userToUpdate.name = name;
      userToUpdate.datebirth = datebirth;
      userToUpdate.profilePic = profilePic;

      await userToUpdate.save();

      res
        .status(200)
        .json({ user: userToUpdate, msg: "Profile updated successfully" });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ msg: "An error occurred while updating the profile" });
    }
  }
);
app.post("/addCourse", async (req, res) => {
  try {
    const code = req.body.code;
    const name = req.body.name;
    const link = req.body.link;

    const course = await courseModel.findOne({ code: code });
    if (course) return res.status(404).json({ msg: "Course Already Exist.." });

    const newCourse = new courseModel({
      code: code,
      name: name,
      link: link,
    });
    await newCourse.save();
    res
      .status(200)
      .json({ course: newCourse, msg: "Course Added Successfuly.." });
  } catch (error) {
    res.status(500).json({ msg: "There is Error.." });
  }
});

app.get("/getCourses", async (req, res) => {
  try {
    const courses = await courseModel.find({});
    res.status(200).json({ courses: courses });
  } catch (error) {
    res.status(500).json({ msg: "There is Error.." });
  }
});

// Display All Videos in Videos Page
app.get("/getVideos", async (req, res) => {
  try {
    const videos = await videoModel.find({}).sort({ createdAt: -1 });
    res.status(200).json({ videos: videos });
  } catch (error) {
    res.status(500).json({ msg: "There is Error.." });
  }
});

app.post("/addVideo", async (req, res) => {
  try {
    const vidname = req.body.vidname;
    const vidcourse = req.body.vidcourse;
    const vidlink = req.body.vidlink;

    const newVideo = new videoModel({
      vidname: vidname,
      vidcourse: vidcourse,
      vidlink: vidlink,
    });
    await newVideo.save();
    res.status(200).json({ video: newVideo, msg: "Video Added Successfuly.." });
  } catch (error) {
    res.status(500).json({ msg: "There is Error.." });
  }
});

app.put("/likeVideo/:videoId", async (req, res) => {
  try {
    const videoId = req.params.videoId;
    const userId = req.body.userId;

    const video = await videoModel.findById(videoId);
    if (!video) return res.status(500).json({ msg: "Video Not Found.." });

    const hasliked = video.vidlikes.users.includes(userId);

    const update = hasliked
      ? { $inc: { "vidlikes.count": -1 }, $pull: { "vidlikes.users": userId } }
      : {
          $inc: { "vidlikes.count": 1 },
          $addToSet: { "vidlikes.users": userId },
        };

    const updatedVideo = await videoModel.findByIdAndUpdate(videoId, update, {
      new: true,
    });

    const msg = hasliked ? "Video Unliked.." : "Video Liked..";

    res.status(200).json({ updatedVideo: updatedVideo, msg: msg });
  } catch (error) {
    res.status(500).json({ msg: "There is Error.." });
  }
});

// Display All the Users in Admin Page
app.get("/getUsers", async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).json({ users: users });
  } catch (error) {
    res.status(500).json({ msg: "Error fetching users.." });
  }
});

app.delete("/deleteusers/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const deletedUser = await userModel.findOneAndDelete({ email });

    if (!deletedUser) {
      return res.status(404).json({ msg: "User not found.." });
    }

    res.status(200).json({
      msg: "User deleted successfully..",
      user: deletedUser,
    });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting user.." });
  }
});

app.put("/updateuser/:email", async (req, res) => {
  try {
    const { email: oldEmail } = req.params;
    const { name, newEmail, datebirth } = req.body;

    const updatedUser = await userModel.findOneAndUpdate(
      { email: oldEmail },
      { name, email: newEmail, datebirth },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found.." });
    }

    res.status(200).json({
      msg: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ msg: "Error updating user.." });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.findOne({ username });

  if (!user) {
    return res.json({ success: false, message: "User Not Found.." });
  }

  if (password === user.password) {
    if (user.roll === "Admin") {
      return res.json({ success: true, role: "admin" });
    } else if (user.roll === "Retailer") {
      return res.json({ success: true, role: "retailer" });
    }
  }

  return res.json({ success: false, message: "Wrong credentials" });
});
