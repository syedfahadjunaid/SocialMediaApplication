import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const forumComments = createApi({
  reducerPath: "forumComments",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.React_App_Base_url }),
  endpoints: (builder) => ({
    getForumsComments: builder.query({
      query: () => {
        return {
          url: `get-all-forum-Comment`,
          method: "GET",
        };
      },
    }),

    getForumCommentById: builder.query({
      query: (id) => {
        // console.log("ID: ", id);
        return {
          url: `get-one-comment/${id}`,
          method: "GET",
        };
      },
    }),

    createForumComment: builder.mutation({
      query: (newData) => {
        // console.log("CREATE BLOG:", newData);
        return {
          url: `create-forum-comments`,
          method: "POST",
          body: newData,
          headers: {
            // "Content-Type": "multipart/form-data",
          },
        };
      },
    }),

    updateForumCommentById: builder.mutation({
      query: (updateData) => {
        return {
          url: `forum-comments-Update/${updateData.id}`,
          method: "PUT",
          body: updateData.updateData,
          headers: {
            // "Content-Type": "multipart/form-data",
            // "content-type": "application/json",
          },
        };
      },
      // invalidatesTags: ["Albums"],
    }),

    deleteForumCommentById: builder.mutation({
      query: (id) => {
        // console.log("DELETE ID: ", id);
        return {
          url: `forum-comment-delete/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useCreateForumCommentMutation,
  useDeleteForumCommentByIdMutation,
  useGetForumCommentByIdQuery,
  useUpdateForumCommentByIdMutation,
  useGetForumsCommentsQuery,
} = forumComments;
