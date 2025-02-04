import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_NYT_API_KEY;
const ARTICLE_URL = import.meta.env.VITE_NYT_ARTICLE_API_BASE_URL;
const SECTION_URL = import.meta.env.VITE_NYT_SECTION_API_BASE_URL;

// Async thunk to fetch articles from API
export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async (isSectionPage, { getState, rejectWithValue }) => {
    const selectedSubsection = getState().sections.selectedSubsection;
    // Determine the API endpoint based on whether its's a section page
    const BASE_URL = isSectionPage
      ? `${SECTION_URL}${selectedSubsection}.json`
      : ARTICLE_URL;
    try {
      const response = await axios.get(`${BASE_URL}?api-key=${API_KEY}`);
      localStorage.setItem("sectionName", response.data.section);
      return response.data.results;
    } catch (error) {
      return rejectWithValue(
        error.status || error.response.statusText || "Uknow Error"
      );
    }
  }
);

// Redux slice for managing article state
const articleSlice = createSlice({
  name: "articles",
  initialState: {
    articles: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle loading state when fetching articles
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Update state with fetched articles when request succeeds
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      // Handle errors if the API request fails
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default articleSlice.reducer;
