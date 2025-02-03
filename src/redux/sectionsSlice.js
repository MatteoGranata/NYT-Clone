import { createSlice } from "@reduxjs/toolkit";
// Initial state with selected subsection from localStorage (if available)
const initialState = {
  selectedSubsection: localStorage.getItem("selectedSubsection") || null,
};

const sectionsSlice = createSlice({
  name: "sections",
  initialState,
  reducers: {
    // Updates the selected subsection and stores it in localStorage
    setSelectedSubsection: (state, action) => {
      state.selectedSubsection = action.payload;
      localStorage.setItem("selectedSubsection", action.payload);
    },
  },
});

export const { setSelectedSubsection } = sectionsSlice.actions;
export default sectionsSlice.reducer;
