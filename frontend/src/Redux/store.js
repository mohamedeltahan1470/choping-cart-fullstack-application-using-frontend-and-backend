import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { oneproductApi, productsApi } from "./productsApi";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    cartt: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [oneproductApi.reducerPath]: oneproductApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productsApi.middleware)
      .concat(oneproductApi.middleware),
});

setupListeners(store.dispatch);
