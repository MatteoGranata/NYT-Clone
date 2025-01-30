import { configureStore } from "@reduxjs/toolkit";
import articleReducer from "./articleSlice";
import topReducer from "./topArticleSlice";

const store = configureStore({
  reducer: {
    articles: articleReducer,
    top: topReducer,
  },
});

export default store;
