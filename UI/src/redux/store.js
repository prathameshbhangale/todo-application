import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./slice/userSlice"
import todoSlice from "./slice/todoSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    todo: todoSlice
  },
});