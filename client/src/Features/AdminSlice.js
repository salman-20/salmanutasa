import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as ENV from "../config.js";

const initialState = {
  users: [],
  videos: [],
  courses: [],
  vidlikes: [],
  status: "",
};

export const getUsers = createAsyncThunk("admin/getUsers", async () => {
  try {
    const response = await axios.get(`${ENV.SERVER_URL}/getUsers`);
    const user = response.data.users;
    return user;
  } catch (error) {
    alert(error.response.data.msg);
    throw new Error(error.response.data.msg);
  }
});

export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (email) => {
    try {
      const response = await axios.delete(
        `${ENV.SERVER_URL}/deleteusers/${email}`
      );
      return response.data.user;
    } catch (error) {
      alert(error.response.data.msg);
      throw new Error(error.response.data.msg);
    }
  }
);

export const updateUser = createAsyncThunk(
  "admin/updateUser",
  async ({ email, updatedFields }) => {
    try {
      const response = await axios.put(
        `${ENV.SERVER_URL}/updateuser/${email}`,
        updatedFields
      );
      return response.data.user;
    } catch (error) {
      alert(error.response.data.msg);
      throw new Error(error.response.data.msg);
    }
  }
);

export const getCourses = createAsyncThunk("admin/getCourses", async () => {
  try {
    const response = await axios.get(`${ENV.SERVER_URL}/getCourses`);
    return response.data.courses;
  } catch (error) {
    alert(error.response.data.msg);
    throw new Error(error.response.data.msg);
  }
});

export const addCourse = createAsyncThunk(
  "admin/addCourse",
  async (courseData) => {
    try {
      const response = await axios.post(`${ENV.SERVER_URL}/addCourse`, {
        code: courseData.code,
        name: courseData.name,
        link: courseData.link,
      });
      alert(response.data.msg);
      return response.data.course;
    } catch (error) {
      alert(error.response.data.msg);
      throw new Error(error.response.data.msg);
    }
  }
);

export const getVideos = createAsyncThunk("admin/getVideos", async () => {
  try {
    const response = await axios.get(`${ENV.SERVER_URL}/getVideos`);
    return response.data.videos;
  } catch (error) {
    throw new Error(error.response.data.msg);
  }
});

export const addVideo = createAsyncThunk(
  "admin/addVideo",
  async (videoData) => {
    try {
      const response = await axios.post(`${ENV.SERVER_URL}/addVideo`, {
        vidname: videoData.vidname,
        vidcourse: videoData.vidcourse,
        vidlink: videoData.vidlink,
      });
      alert(response.data.msg);
      return response.data.video;
    } catch (error) {
      alert(error.response.data.msg);
      throw new Error(error.response.data.msg);
    }
  }
);

export const likeVideo = createAsyncThunk(
  "admin/likeVideo",
  async (videoData) => {
    try {
      const response = await axios.put(
        `${ENV.SERVER_URL}/likeVideo/${videoData.videoId}`,
        {
          userId: videoData.userId,
        }
      );

      const video = response.data.updatedVideo;
      return video;
    } catch (error) {
      alert(error.response.data.msg);
      throw new Error(error.response.data.msg);
    }
  }
);

const AdminSlice = createSlice({
  name: "admin",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state, action) => {
        state.status = "loading";
      })

      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = "success";
        state.users = action.payload;
      })

      .addCase(getUsers.rejected, (state, action) => {
        state.status = "error";
      })

      .addCase(deleteUser.pending, (state, action) => {
        state.status = "loading";
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = "success";
        state.users = state.users.filter(
          (user) => user.email !== action.payload.email
        );
      })

      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "error";
      })

      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "success";
        const updatedUserIndex = state.users.findIndex(
          (user) => user.email === action.payload.email
        );
        if (updatedUserIndex !== -1) {
          state.users[updatedUserIndex] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state) => {
        state.status = "error";
      })

      .addCase(getCourses.pending, (state, action) => {
        state.status = "loading";
      })

      .addCase(getCourses.fulfilled, (state, action) => {
        state.status = "success";
        state.courses = action.payload;
      })

      .addCase(getCourses.rejected, (state, action) => {
        state.status = "error";
      })

      .addCase(addCourse.pending, (state, action) => {
        state.status = "loading";
      })

      .addCase(addCourse.fulfilled, (state, action) => {
        state.status = "success";
        state.courses.push(action.payload);
      })

      .addCase(addCourse.rejected, (state, action) => {
        state.status = "error";
      })

      .addCase(getVideos.pending, (state, action) => {
        state.status = "loading";
      })

      .addCase(getVideos.fulfilled, (state, action) => {
        state.status = "success";
        state.videos = action.payload;
      })

      .addCase(getVideos.rejected, (state, action) => {
        state.status = "error";
      })

      .addCase(addVideo.pending, (state, action) => {
        state.status = "loading";
      })

      .addCase(addVideo.fulfilled, (state, action) => {
        state.status = "success";
        state.videos.push(action.payload);
      })

      .addCase(addVideo.rejected, (state, action) => {
        state.status = "error";
      })

      .addCase(likeVideo.pending, (state, action) => {
        state.status = "loading";
      })

      .addCase(likeVideo.fulfilled, (state, action) => {
        state.status = "success";
        const videoIndex = state.videos.findIndex(
          (video) => video._id === action.payload._id
        );
        if (videoIndex !== -1) {
          state.videos[videoIndex].likes = action.payload.likes;
        }
      })

      .addCase(likeVideo.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export default AdminSlice.reducer;
