import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const URL = import.meta.env.VITE_BASE_URL;
const LOGIN_URL = import.meta.env.VITE_LOGIN_URL;

export const productApi = createApi({
    reducerPath: 'products',
    baseQuery: fetchBaseQuery({ baseUrl: URL }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => '/products',
        }),

    }),
});

export const { useGetProductsQuery } = productApi;
