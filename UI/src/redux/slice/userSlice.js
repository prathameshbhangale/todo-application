import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: localStorage.getItem('TODO_WEB_name') || '',
  email: localStorage.getItem('TODO_WEB_email') || '',
  token: localStorage.getItem('TODO_WEB_token') || '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
      localStorage.setItem('TODO_WEB_name', action.payload);
    },
    setEmail: (state, action) => {
      state.email = action.payload;
      localStorage.setItem('TODO_WEB_email', action.payload);
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('TODO_WEB_token', action.payload);
    },
    logout: (state) => {
      state.name = '';
      state.email = '';
      state.token = '';
      localStorage.removeItem('TODO_WEB_name');
      localStorage.removeItem('TODO_WEB_email');
      localStorage.removeItem('TODO_WEB_token');
    },
  },
});

export const { setName, setEmail, setToken, logout } = userSlice.actions;

export default userSlice.reducer;