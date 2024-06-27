import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const forum = createApi({
  reducerPath: "forum",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.React_App_Base_url }),
  endpoints: (builder) => ({
    getForums: builder.query({
      query: () => {
        return {
          url: `get-all-forum`,
          method: "GET",
        };
      },
    }),

    getForumById: builder.query({
      query: (id) => {
        // console.log("ID: ", id);
        return {
          url: `get-one-forum/${id}`,
          method: "GET",
        };
      },
    }),

    createForum: builder.mutation({
      query: (newData) => {
        // console.log("CREATE BLOG:", newData);
        return {
          url: `create-forums`,
          method: "POST",
          body: newData,
          headers: {
            // "Content-Type": "multipart/form-data",
          },
        };
      },
    }),

    updateForumById: builder.mutation({
      query: (updateData) => {
        return {
          url: `Forums-Update/${updateData.id}`,
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

    deleteForumById: builder.mutation({
      query: (id) => {
        // console.log("DELETE ID: ", id);
        return {
          url: `forums-delete/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useCreateForumMutation,
  useGetForumByIdQuery,
  useGetForumsQuery,
  useUpdateForumByIdMutation,
  useDeleteForumByIdMutation,
} = forum;
