import { createSlice } from "@reduxjs/toolkit";

// initial state, retrieving stored values from localStorage if available
const initialState = {
  selectedValue: localStorage.getItem("inputValue") || null,
  selectedOption: localStorage.getItem("optionValue") || "relevance",
};
// Redux slice to manage search input and sorting option
const InputSlice = createSlice({
  name: "input",
  initialState,
  reducers: {
    // Updates the search input value and saves it to localstorage
    setInputSearch: (state, action) => {
      state.selectedValue = action.payload;
      localStorage.setItem("inputValue", action.payload);
    },
    setOptionSearch: (state, action) => {
      state.selectedOption = action.payload;
      localStorage.setItem("optionValue", action.payload);
    },
  },
});

export const { setInputSearch, setOptionSearch } = InputSlice.actions;
export default InputSlice.reducer;
