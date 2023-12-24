import { createSlice } from '@reduxjs/toolkit';
import defaultUsers from '../../fakeData/user.json';

const initialState = {
  page: 'LANDING_PAGE',
  user: null,
};

export const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    goToPage: (state, action) => {
      state.page = action.payload;
    },
    userLogin: (state, action) => {
      state.user = action.payload;
    },
    userLogout: (state, action) => {
      state.user = null;
    },
  },
});

export const { goToPage, userLogin, userLogout } = statusSlice.actions;

export default statusSlice.reducer;
