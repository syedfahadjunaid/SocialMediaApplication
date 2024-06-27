import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  forumComments: [],
  forumCommentUpdate: "",
  forumCommentCreate: "",
  forumCommentRefetch: "",
};

const forumCommentSlice = createSlice({
  name: "forumComments",
  initialState,
  reducers: {
    getAllForumComments: (state, action) => {
      state.forumComments = action.payload;
    },
    forumCommentCreateChange: (state, action) => {
      state.forumCommentCreate = action.payload;
    },
    forumCommentUpdateChange: (state, action) => {
      state.forumCommentUpdate = action.payload;
    },
    forumCommentRefetchChange: (state, action) => {
      state.forumCommentRefetch = action.payload;
    },
  },
});

export const {
  getAllForumComments,
  forumCommentCreateChange,
  forumCommentUpdateChange,
  forumCommentRefetchChange,
} = forumCommentSlice.actions;

export default forumCommentSlice.reducer;
