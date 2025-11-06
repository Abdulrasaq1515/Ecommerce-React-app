import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = (import.meta.env.VITE_BASE_URL ?? 'https://fakestoreapi.com/').replace(/\/+$/, '');

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Cart'],
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => 'carts/1',
      transformResponse: (response) => {
        return {
          items: response.products.map(product => ({
            id: product.productId,
            quantity: product.quantity
          })),
          totalQuantity: response.products.reduce((total, product) => total + product.quantity, 0)
        };
      },
      providesTags: ['Cart']
    }),
    updateCart: builder.mutation({
      query: (cart) => ({
        url: 'carts/1',
        method: 'PUT',
        body: {
          userId: 1,
          date: new Date().toISOString(),
          products: cart.items.map(item => ({
            productId: item.id,
            quantity: item.quantity
          }))
        }
      }),
      invalidatesTags: ['Cart']
    }),
    addToCart: builder.mutation({
      query: (product) => ({
        url: 'carts',
        method: 'POST',
        body: {
          userId: 1,
          date: new Date().toISOString(),
          products: [{
            productId: product.id,
            quantity: product.quantity
          }]
        }
      }),
      invalidatesTags: ['Cart']
    })
  })
});

export const {useGetCartQuery,useUpdateCartMutation,useAddToCartMutation} = cartApi;
