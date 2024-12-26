import { configureStore } from '@reduxjs/toolkit';
import ordersReducer from './slices/ordersSlice';

const store = configureStore({
  reducer: {
    orders: ordersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
