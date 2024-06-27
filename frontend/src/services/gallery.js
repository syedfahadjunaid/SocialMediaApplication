import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const gallery = createApi({
  reducerPath: "gallery",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.React_App_Base_url }),
  endpoints: (builder) => ({
    getAllGaleries: builder.query({
      query: () => {
        return {
          url: `get-all-Gallery`,
          method: "GET",
        };
      },
    }),

    getGalleryById: builder.query({
      query: (galleryId) => {
        // console.log("ID: ", id);
        return {
          url: `get-one-user-Gallery/${galleryId}`,
          method: "GET",
        };
      },
    }),

    createGallery: builder.mutation({
      query: (newData) => {
        // console.log("CREATE BLOG:", newData);
        return {
          url: `add-Gallery`,
          method: "POST",
          body: newData,
          headers: {
            // "Content-Type": "multipart/form-data",
          },
        };
      },
    }),

    updateGalleryById: builder.mutation({
      query: (updateData) => {
        return {
          url: `upadte-Gallery/${updateData.id}`,
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

    deleteGalleryById: builder.mutation({
      query: (deleteData) => {
        // console.log("DELETE ID: ", id);
        return {
          url: `gallerys-delete/${deleteData.galleryId}`,
          method: "DELETE",
          body: deleteData.userId,
        };
      },
    }),
  }),
});

export const {
  useCreateGalleryMutation,
  useDeleteGalleryByIdMutation,
  useGetAllGaleriesQuery,
  useGetGalleryByIdQuery,
  useUpdateGalleryByIdMutation,
} = gallery;
