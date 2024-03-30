import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "./features/ordersSlice";
import userReducer from "./features/userSlice";

export const store = () => {
  return configureStore({
    reducer: {
      orders: ordersReducer,
      user: userReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
