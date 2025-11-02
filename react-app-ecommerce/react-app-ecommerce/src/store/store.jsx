import { configureStore } from '@reduxjs/toolkit';
import { loginApi } from '../api/loginApi';
import { productApi } from '../api/productApi';

export const store = configureStore({
  reducer: {
    [loginApi.reducerPath]: loginApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loginApi.middleware, productApi.middleware),
});
export default store;