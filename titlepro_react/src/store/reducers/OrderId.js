import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderId: null,
};


const orderIdSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrderId: (state, action) => {
      state.orderId = action.payload;
    },
    removeOrderId: (state) => {
      state.orderId = null;
    },
  },
});

export const { addOrderId, removeOrderId } = orderIdSlice.actions;
export const orderId = (state) => state.order.orderId;
export default orderIdSlice.reducer;
