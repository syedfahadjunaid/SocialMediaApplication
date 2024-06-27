import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  forumTopics: [],
  forumTopicCreate: "",
  forumTopicUpdate: "",
  forumTopicRefetch: 0,
};

const forumTopicSlice = createSlice({
  name: "forumTopic",
  initialState,
  reducers: {
    getAllForumTopics: (state, action) => {
      state.forumTopics = action.payload;
    },
    createForumTopicChange: (state, action) => {
      state.forumTopicCreate = action.payload;
    },
    updateForumTopicChange: (state, action) => {
      state.forumTopicUpdate = action.payload;
    },
    forumTopicRefechChange: (state, action) => {
      state.forumTopicRefetch = action.payload;
    },
  },
});

export const {
  getAllForumTopics,
  createForumTopicChange,
  updateForumTopicChange,
  forumTopicRefechChange,
} = forumTopicSlice.actions;
export default forumTopicSlice.reducer;
