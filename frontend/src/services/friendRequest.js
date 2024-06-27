import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const friendRequest = createApi({
  reducerPath: "friendRequest",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.React_App_Base_url }),
  endpoints: (builder) => ({
    getFriendRequests: builder.query({
      query: () => {
        return {
          url: `friendRequests`,
          method: "GET",
        };
      },
    }),

    getFriendRequestById: builder.query({
      query: (id) => {
        // console.log("ID: ", id);
        return {
          url: `friendRequests/${id}`,
          method: "GET",
        };
      },
    }),

    getFriendRequestFromUserById: builder.query({
      query: (id) => {
        // console.log("ID: ", id);
        return {
          url: `friendRequests-send/${id}`,
          method: "GET",
        };
      },
    }),

    getFriendRequestToUserById: builder.query({
      query: (id) => {
        // console.log("ID: ", id);
        return {
          url: `friendRequests-to-get/${id}`,
          method: "GET",
        };
      },
    }),

    createFriendRequest: builder.mutation({
      query: (newData) => {
        // console.log("CREATE BLOG:", newData);
        return {
          url: `friendRequests`,
          method: "POST",
          body: newData,
          headers: {
            // "Content-Type": "multipart/form-data",
          },
        };
      },
    }),

    updateFriendRequestById: builder.mutation({
      query: (updateData) => {
        return {
          url: `friendRequests/${updateData.id}`,
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

    deleteFriendRequestById: builder.mutation({
      query: (id) => {
        // console.log("DELETE ID: ", id);
        return {
          url: `friendRequests/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useCreateFriendRequestMutation,
  useDeleteFriendRequestByIdMutation,
  useGetFriendRequestByIdQuery,
  useGetFriendRequestFromUserByIdQuery,
  useGetFriendRequestToUserByIdQuery,
  useGetFriendRequestsQuery,
  useUpdateFriendRequestByIdMutation,
} = friendRequest;
