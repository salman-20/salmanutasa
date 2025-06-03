import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as ENV from "../config.js";

const initialState = {
  user: {},
};

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userData) => {
    try {
      const response = await axios.post(`${ENV.SERVER_URL}/registerUser`, {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        datebirth: userData.datebirth,
      });
      alert(response.data.msg);
      const user = response.data.user;
      return user;
    } catch (error) {
      alert(error.response.data.msg);
      throw new Error(error.response.data.msg);
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (userData) => {
    try {
      const response = await axios.post(`${ENV.SERVER_URL}/loginUser`, {
        email: userData.email,
        password: userData.password,
      });
      const user = response.data.user;
      return user;
    } catch (error) {
      alert(error.response.data.msg);
      throw new Error(error.response.data.msg);
    }
  }
);

export const logoutUser = createAsyncThunk("users/logoutUser", async () => {
  try {
    const response = await axios.post(`${ENV.SERVER_URL}/logoutUser`);
  } catch (error) {
    alert(error.response.data.msg);
    throw new Error(error.response.data.msg);
  }
});

export const resetPassoword = createAsyncThunk(
  "users/resetPassoword",
  async (userData) => {
    try {
      const response = await axios.put(`${ENV.SERVER_URL}/resetPassoword`, {
        email: userData.email,
        datebirth: userData.datebirth,
        password: userData.password,
      });
      alert(response.data.msg);
      const user = response.data.user;
      return user;
    } catch (error) {
      alert(error.response.data.msg);
      throw new Error(error.response.data.msg);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (userData) => {
    try {
      const response = await axios.put(
        `${ENV.SERVER_URL}/updateUserProfile/`,
        {
          email: userData.email,
          name: userData.name,
          datebirth: userData.datebirth,
          profilePic: userData.profilePic,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const user = response.data.user;
      return user;
    } catch (error) {
      alert(error.response.data.msg);
      throw new Error(error.response.data.msg);
    }
  }
);

const UserSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.status = "loading";
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.status = "error";
      })

      .addCase(loginUser.pending, (state, action) => {
        state.status = "loading";
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.status = "error";
      })

      .addCase(logoutUser.pending, (state, action) => {
        state.status = "loading";
      })

      .addCase(logoutUser.fulfilled, (state, action) => {
        state.status = "success";
        state.user = {};
      })

      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "error";
      })

      .addCase(resetPassoword.pending, (state, action) => {
        state.status = "loading";
      })

      .addCase(resetPassoword.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
      })

      .addCase(resetPassoword.rejected, (state, action) => {
        state.status = "error";
      })

      .addCase(updateUserProfile.pending, (state, action) => {
        state.status = "loading";
      })

      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
      })

      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export default UserSlice.reducer;
