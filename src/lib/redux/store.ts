import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "./features/ordersSlice";
import userReducer from "./features/userSlice";
import orderHistoryReducer from "./features/orderHistorySlice";

export const store = () => {
  return configureStore({
    reducer: {
      orders: ordersReducer,
      user: userReducer,
      orderHistory: orderHistoryReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
