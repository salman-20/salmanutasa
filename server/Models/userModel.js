import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
  name: { type: String, requird: true },
  email: { type: String, requird: true },
  password: { type: String, required: true },
  datebirth: { type: String, required: true },
  profilePic: { type: String, default: "img.png" },
});

const userModel = mongoose.model("users", usersSchema);
export default userModel;
