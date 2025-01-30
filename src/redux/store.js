import { configureStore } from "@reduxjs/toolkit";
import articleReducer from "./articleSlice";
import topReducer from "./topArticleSlice";
import sectionReducer from "./sectionsSlice";
import searchReducer from "./searchSlice";
import inputReducer from "./inputSlice"

const store = configureStore({
  reducer: {
    articles: articleReducer,
    top: topReducer,
    sections: sectionReducer,
    search: searchReducer,
    input:inputReducer
  },
});

export default store;
