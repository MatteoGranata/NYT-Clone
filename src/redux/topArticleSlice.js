import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_NYT_API_KEY;
const BASE_URL = import.meta.env.VITE_NYT_TOP_API_BASE_URL;

export const fetchTop = createAsyncThunk(
  "top/fetchTop",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}?api-key=${API_KEY}`);
      return response.data.results;
    } catch (error) {
      return rejectWithValue(
        error.status || error.response.statusText || error.message || "Uknow Error"
      );
    }
  }
);

const topSlice = createSlice({
  name: "top",
  initialState: {
    top: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTop.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTop.fulfilled, (state, action) => {
        state.loading = false;
        state.top = action.payload;
      })
      .addCase(fetchTop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default topSlice.reducer;
