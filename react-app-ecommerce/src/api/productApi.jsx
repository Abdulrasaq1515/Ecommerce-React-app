import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Use VITE_BASE_URL and trim trailing slashes
const baseUrl = (import.meta.env.VITE_BASE_URL ?? 'https://fakestoreapi.com/').replace(/\/+$/, '');

export const productApi = createApi({
  reducerPath: 'products',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      // No leading slash when baseUrl is provided
      query: () => 'products',
    }),
  }),
});

export const { useGetAllProductsQuery } = productApi;