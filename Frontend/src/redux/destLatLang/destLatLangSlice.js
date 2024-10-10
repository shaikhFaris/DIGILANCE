import { createSlice } from "@reduxjs/toolkit";

export const destLatLangReducer = createSlice({
  name: "destLatLang",
  initialState: {
    value: null, // holds lat and lng of dest
  },
  reducers: {
    setter: (state, action) => {
      state.value = action.payload; // Update the state with action payload
    },
  },
});

// Action creators are generated for each case reducer function
export const { setter } = destLatLangReducer.actions;

export default destLatLangReducer.reducer;
