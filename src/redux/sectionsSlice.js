import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedSubsection: localStorage.getItem("selectedSubsection") || null, 
};

const sectionsSlice = createSlice({
  name: "sections",
  initialState,
  reducers: {
    setSelectedSubsection: (state, action) => {
      state.selectedSubsection = action.payload;
      localStorage.setItem("selectedSubsection", action.payload);
    },
  },
});

export const { setSelectedSubsection } = sectionsSlice.actions;
export default sectionsSlice.reducer;
