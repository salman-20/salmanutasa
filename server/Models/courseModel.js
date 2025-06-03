import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
  code: { type: String, requird: true },
  name: { type: String, requird: true },
  link: { type: String, requird: true },
});

const courseModel = mongoose.model("courses", courseSchema);
export default courseModel;
