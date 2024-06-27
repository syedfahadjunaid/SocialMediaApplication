import { configureStore } from "@reduxjs/toolkit";

import userLogin from "../Slice/loginSlice";
import userSlice from "../Slice/userSlice";
import forumSlice from "../Slice/forumSlice";
import forumTopicSlice from "../Slice/forumTopicSlice";
import forumCommentSlice from "../Slice/forumCommentSlice";

import { user } from "../services/user";
import { userStatus } from "../services/userStatus";
import { forum } from "../services/forum";
import { forumTopic } from "../services/forumTopic";
import { forumComments } from "../services/forumComment";
import { friendRequest } from "../services/friendRequest";
import { gallery } from "../services/gallery";

export const store = configureStore({
  reducer: {
    userLogin: userLogin,
    userState: userSlice,
    forumState: forumSlice,
    forumTopicState: forumTopicSlice,
    forumCommentState: forumCommentSlice,
    [user.reducerPath]: user.reducer,
    [userStatus.reducerPath]: userStatus.reducer,
    [forum.reducerPath]: forum.reducer,
    [forumTopic.reducerPath]: forumTopic.reducer,
    [forumComments.reducerPath]: forumComments.reducer,
    [friendRequest.reducerPath]: friendRequest.reducer,
    [gallery.reducerPath]: gallery.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      user.middleware,
      userStatus.middleware,
      forum.middleware,
      forumTopic.middleware,
      forumComments.middleware,
      friendRequest.middleware,
      gallery.middleware,
    ]),
});
