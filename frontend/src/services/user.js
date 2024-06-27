import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const user = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.React_App_Base_url }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => {
        return {
          url: `getUserData`,
          method: "GET",
        };
      },
    }),

    getUserById: builder.query({
      query: (id) => {
        // console.log("ID: ", id);
        return {
          url: `user/${id}`,
          method: "GET",
        };
      },
    }),

    createUser: builder.mutation({
      query: (newData) => {
        // console.log("CREATE BLOG:", newData);
        return {
          url: `userRegister`,
          method: "POST",
          body: newData,
          headers: {
            // "Content-Type": "multipart/form-data",
          },
        };
      },
    }),

    updateUserById: builder.mutation({
      query: (updateData) => {
        return {
          url: `userUpdate/${updateData.id}`,
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

    updateUserProfileImageById: builder.mutation({
      query: (updateData) => {
        return {
          url: `user-profile-update/${updateData.id}`,
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

    deleteUserById: builder.mutation({
      query: (id) => {
        // console.log("DELETE ID: ", id);
        return {
          url: `deleteUser/${id}`,
          method: "DELETE",
        };
      },
    }),

    userSignIn: builder.mutation({
      query: (signInData) => {
        return {
          url: `signin`,
          method: "POST",
          body: signInData,
        };
      },
    }),

    userLogout: builder.mutation({
      query: (logoutData) => {
        return {
          url: `userLogout/${logoutData.token}`,
          method: "DELETE",
          body: logoutData.userData,
        };
      },
    }),
  }),
});

export const {
  useCreateUserMutation,
  useDeleteUserByIdMutation,
  useGetUserByIdQuery,
  useUpdateUserByIdMutation,
  useGetUsersQuery,
  useUserSignInMutation,
  useUpdateUserProfileImageByIdMutation,
  useUserLogoutMutation,
} = user;
