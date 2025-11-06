import { configureStore } from '@reduxjs/toolkit';
import { loginApi } from '../api/loginApi';
import { productApi } from '../api/productApi';
import { cartApi } from '../api/cartApi';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    [loginApi.reducerPath]: loginApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      loginApi.middleware,
      productApi.middleware,
      cartApi.middleware
    ),
});
export default store;