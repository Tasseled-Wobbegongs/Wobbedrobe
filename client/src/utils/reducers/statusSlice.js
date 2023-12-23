import { createSlice } from '@reduxjs/toolkit';

const defaultUser = {
  username: 'Chris',
  wardrobe: {
    tops: [
      {
        id: 0,
        color: 'white',
        category: 'hoodie',
        material: 'cotton',
        style: 'sporty',
      },
    ],
    bottoms: [
      {
        id: 0,
        color: 'blue',
        category: 'sweatpants',
        material: 'cotton',
        style: 'sporty',
      },
    ],
    overall: [],
    shoes: [
      {
        id: 0,
        color: 'white',
        category: 'sneakers',
        heals: '2cm',
      },
    ],
  },
  lookbook: [{ top: 0, bottom: 0, shoes: 0 }],
};

const initalState = {
  page: 'HOME',
  user: defaultUser,
};

export const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    goToPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { goToPage } = statusSlice.actions;

export default statusSlice.reducer;
