import { configureStore } from '@reduxjs/toolkit';
import statusReducer from '../utils/reducers/statusSlice';

export const store = configureStore({
  reducer: { status: statusReducer },
});
