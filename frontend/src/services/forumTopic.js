import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const forumTopic = createApi({
  reducerPath: "forumtopic",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.React_App_Base_url }),
  endpoints: (builder) => ({
    getForumsTopic: builder.query({
      query: () => {
        return {
          url: `get-all-forum-topic`,
          method: "GET",
        };
      },
    }),

    getForumTopicById: builder.query({
      query: (id) => {
        // console.log("ID: ", id);
        return {
          url: `get-one-forum-topic/${id}`,
          method: "GET",
        };
      },
    }),

    createForumTopic: builder.mutation({
      query: (newData) => {
        // console.log("CREATE BLOG:", newData);
        return {
          url: `create-forum-topic`,
          method: "POST",
          body: newData,
          headers: {
            // "Content-Type": "multipart/form-data",
          },
        };
      },
    }),

    // updateForumTopicById: builder.mutation({
    //   query: (updateData) => {
    //     return {
    //       url: `Forums-Update/${updateData.id}`,
    //       method: "PUT",
    //       body: updateData.updateData,
    //       headers: {
    //         // "Content-Type": "multipart/form-data",
    //         // "content-type": "application/json",
    //       },
    //     };
    //   },
    //   // invalidatesTags: ["Albums"],
    // }),

    // deleteForumTopicById: builder.mutation({
    //   query: (id) => {
    //     // console.log("DELETE ID: ", id);
    //     return {
    //       url: `forums-delete/${id}`,
    //       method: "DELETE",
    //     };
    //   },
    // }),
  }),
});

export const {
  useCreateForumTopicMutation,
  // useDeleteForumTopicByIdMutation,
  useGetForumTopicByIdQuery,
  useGetForumsTopicQuery,
  // useUpdateForumTopicByIdMutation,
} = forumTopic;
