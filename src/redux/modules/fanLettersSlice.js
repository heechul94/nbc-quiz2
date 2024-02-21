import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../apis/dbApi";

const initialState = {
  fanLetters: [],
  isLoading: false,
  isError: false,
  error: null,
};

export const __getFanLetters = createAsyncThunk(
  "getFanLetters",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/fanletters");
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __postFanLetters = createAsyncThunk(
  "postFanLetters",
  async (payload, thunkAPI) => {
    try {
      const response = await api.post("/fanletters", payload);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __patchFanLetters = createAsyncThunk(
  "patchFanLetters",
  async (payload, thunkAPI) => {
    try {
      const response = await api.patch(`/fanletters/${payload.id}`, {
        content: payload.content,
      });
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteFanLetters = createAsyncThunk(
  "deleteFanLetters",
  async (payload, thunkAPI) => {
    try {
      const response = await api.delete(`/fanletters/${payload}`);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const fanLetters = createSlice({
  name: "fanLetters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__getFanLetters.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__getFanLetters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.fanLetters = action.payload;
      })
      .addCase(__getFanLetters.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
    builder
      .addCase(__postFanLetters.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__postFanLetters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.fanLetters.push(action.payload);
      })
      .addCase(__postFanLetters.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
    builder
      .addCase(__patchFanLetters.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__patchFanLetters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.fanLetters = state.fanLetters.map((letter) =>
          letter.id === action.payload.id ? action.payload : letter
        );
      })
      .addCase(__patchFanLetters.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
    builder
      .addCase(__deleteFanLetters.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__deleteFanLetters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.fanLetters = state.fanLetters.filter(
          (letter) => letter.id !== action.payload.id
        );
      })
      .addCase(__deleteFanLetters.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export default fanLetters.reducer;
