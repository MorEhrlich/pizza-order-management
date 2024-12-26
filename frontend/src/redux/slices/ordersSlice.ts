import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Order {
  id: number;
  title: string;
  status: string;
  orderTime: string;
}

interface OrdersState {
  orders: Order[];
}

const initialState: OrdersState = {
  orders: [],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders(state, action: PayloadAction<Order[]>) {
      state.orders = action.payload;
    },
    updateOrderStatus(state, action: PayloadAction<{ id: number; status: string }>) {
      const order = state.orders.find((o) => o.id === action.payload.id);
      if (order) {
        order.status = action.payload.status;
      }
    },
  },
});

export const { setOrders, updateOrderStatus } = ordersSlice.actions;
export default ordersSlice.reducer;
