import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedValue: localStorage.getItem("inputValue") || null, 
  selectedOption: localStorage.getItem("optionValue") || "relevance",
};

const InputSlice = createSlice({
  name: "input",
  initialState,
  reducers: {
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

export const { setInputSearch,setOptionSearch } = InputSlice.actions;
export default InputSlice.reducer;
