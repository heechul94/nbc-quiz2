import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../apis/authApi";

const initialState = {
  userInfo: localStorage.getItem("userInfo"),
  isLoading: false,
  isLoggedIn: !!localStorage.getItem("accessToken"),
  isError: false,
  error: null,
  success: false,
};

export const __postLogin = createAsyncThunk(
  "postLogin",
  async (payload, thunkAPI) => {
    try {
      const response = await api.post("/login?expiresIn=5s", payload);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const __postRegister = createAsyncThunk(
  "postRegister",
  async (payload, thunkAPI) => {
    try {
      const response = await api.post("/register", payload);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      const {
        response: {
          status,
          data: { message },
        },
      } = error;
      return thunkAPI.rejectWithValue({ status, message });
    }
  }
);

export const __getUser = createAsyncThunk(
  "getUser",
  async (payload, thunkAPI) => {
    try {
      const response = await api.get("/user", {
        headers: {
          Authorization: `Bearer ${payload}`,
        },
      });
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      const {
        response: {
          status,
          data: { message },
        },
      } = error;
      return thunkAPI.rejectWithValue({ status, message });
    }
  }
);

export const __patchProfile = createAsyncThunk(
  "patchProfile",
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      const response = await api.patch("/profile", payload.edited, {
        headers: {
          Authorization: `Bearer ${payload.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      const {
        response: {
          status,
          data: { message },
        },
      } = error;
      return thunkAPI.rejectWithValue({ status, message });
    }
  }
);

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(__postLogin.pending, (state, action) => {
        console.log("pending : ", action);
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__postLogin.fulfilled, (state, action) => {
        console.log("fulfilled : ", action);
        const userInfo = {
          userId: action.payload.userId,
          avatar: action.payload.avatar,
          nickname: action.payload.nickname,
        };
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        state.isLoggedIn = true;
        state.isLoading = false;
        state.isError = false;
        state.userInfo = userInfo;
        state.success = action.payload.success;
      })
      .addCase(__postLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
    builder
      .addCase(__postRegister.pending, (state, action) => {
        console.log("pending : ", action);
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__postRegister.fulfilled, (state, action) => {
        console.log("fulfilled : ", action);
        state.isLoading = false;
        state.isError = false;
        state.success = action.payload.success;
      })
      .addCase(__postRegister.rejected, (state, action) => {
        console.log("rejected : ", action);
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
    builder
      .addCase(__getUser.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__getUser.fulfilled, (state, action) => {
        console.log("fulfilled : ", action);
        const userInfo = {
          userId: action.payload.id,
          avatar: action.payload.avatar,
          nickname: action.payload.nickname,
        };
        localStorage.getItem("userInfo", JSON.stringify(userInfo));
        state.isLoading = false;
        state.isLoggedIn = true;
        state.isError = false;
        state.userInfo = userInfo;
        state.success = action.payload.success;
      })
      .addCase(__getUser.rejected, (state, action) => {
        alert(action.payload.message);
        state.isLoading = false;
        state.isLoggedIn = false;
        state.isError = true;
        state.error = action.payload;
      });
    builder
      .addCase(__patchProfile.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__patchProfile.fulfilled, (state, action) => {
        console.log("fulfilled : ", action);
        state.isLoading = false;
        state.isError = false;
        if (action.payload.nickname) {
          state.userInfo = {
            ...state.userInfo,
            nickname: action.payload.nickname,
          };
        }
        if (action.payload.avatar) {
          state.userInfo = {
            ...state.userInfo,
            avatar: action.payload.avatar,
          };
        }
      })
      .addCase(__patchProfile.rejected, (state, action) => {
        console.log("rejected : ", action);
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export const { setIsLoggedIn, setUserInfo } = user.actions;
export default user.reducer;
