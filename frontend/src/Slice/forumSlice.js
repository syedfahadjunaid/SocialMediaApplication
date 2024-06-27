import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  forums: [],
  forumRefetch: 0,
};

const forumSlice = createSlice({
  name: "forums",
  initialState,
  reducers: {
    getAllForums: (state, action) => {
      state.forums = action.payload;
    },
    forumRefetchChange: (state, action) => {
      state.forums = action.payload;
    },
  },
});

export const { getAllForums, forumRefetchChange } = forumSlice.actions;

export default forumSlice.reducer;
