import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_BASE_URL ?? 'https://fakestoreapi.com/';

export const loginApi = createApi({
  reducerPath: 'login',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    postLogin: builder.mutation({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

export const { usePostLoginMutation } = loginApi;