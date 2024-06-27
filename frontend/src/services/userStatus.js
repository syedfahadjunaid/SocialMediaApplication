import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userStatus = createApi({
  reducerPath: "userStatus",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.React_App_Base_url }),
  endpoints: (builder) => ({
    getUserStatus: builder.query({
      query: () => {
        return {
          url: `all-user-status`,
          method: "GET",
        };
      },
    }),

    getUserStatusById: builder.query({
      query: (id) => {
        // console.log("ID: ", id);
        return {
          url: `user-status/${id}`,
          method: "GET",
        };
      },
    }),

    createUserStatus: builder.mutation({
      query: (newData) => {
        // console.log("CREATE BLOG:", newData);
        return {
          url: `user/status/create`,
          method: "POST",
          body: newData,
          headers: {
            // "Content-Type": "multipart/form-data",
          },
        };
      },
    }),

    updateUserStatusById: builder.mutation({
      query: (updateData) => {
        return {
          url: `user/update/status/${updateData.id}`,
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

    updateUserBlockById: builder.mutation({
      query: (updateData) => {
        return {
          url: `user/update/block/${updateData.id}`,
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

    // deleteUserById: builder.mutation({
    //   query: (id) => {
    //     // console.log("DELETE ID: ", id);
    //     return {
    //       url: `deleteUser/${id}`,
    //       method: "DELETE",
    //     };
    //   },
    // }),
  }),
});

export const {
  useGetUserStatusQuery,
  useCreateUserStatusMutation,
  useGetUserStatusByIdQuery,
  useUpdateUserBlockByIdMutation,
  useUpdateUserStatusByIdMutation,
} = userStatus;
