import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_NYT_API_KEY;
const SEARCH_URL = import.meta.env.VITE_NYT_SEARCH_API_BASE_URL;

export const fetchSearch = createAsyncThunk(
  "search/fetchSearch",
  async (isSearchPage, { getState, rejectWithValue }) => {
    const selectedValue = getState().input.selectedValue;
    const selectedOption = getState().input.selectedOption;
    const BASE_URL = isSearchPage && `${SEARCH_URL}${selectedValue}`;
    try {
      const response = await axios.get(
        `${BASE_URL}&sort=${selectedOption}&api-key=${API_KEY}`
      );
      localStorage.setItem("hits", response.data.response.meta.hits);
      return response.data.response.docs;
    } catch (error) {
      return rejectWithValue(
        error.status || error.response.statusText || error.message || "Uknow Error"
      );
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    search: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchSearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.search = action.payload;
      })
      .addCase(fetchSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default searchSlice.reducer;
