import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/AuthSlice"; 
import OrderId from "./reducers/OrderId";

const store = configureStore({
  reducer: {
    auth: authReducer,
    order: OrderId
  },
});

export default store;
