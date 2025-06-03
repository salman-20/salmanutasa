import mongoose from "mongoose";

const videoSchema = mongoose.Schema(
  {
    vidname: { type: String, requird: true },
    vidcourse: { type: String, requird: true },
    vidlink: { type: String, required: true },
    vidlikes: {
      count: {
        type: Number,
        default: 0,
      },
      users: {
        type: [String],
        default: [],
      },
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

const videoModel = mongoose.model("video", videoSchema);
export default videoModel;
