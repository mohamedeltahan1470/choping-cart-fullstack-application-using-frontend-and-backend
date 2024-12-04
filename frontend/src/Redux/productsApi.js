import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  endpoints: (builder) => ({
    getproductsByName: builder.query({
      query: (name) => `products`,
    }),
  }),
});
export const oneproductApi = createApi({
  reducerPath: "oneproduct",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  endpoints: (builder) => ({
    Getoneproduct: builder.query({
      query: (name) => `products/${name}`,
    }),
  }),
});
export const { useGetproductsByNameQuery } = productsApi;
export const { useGetoneproductQuery } = oneproductApi;
