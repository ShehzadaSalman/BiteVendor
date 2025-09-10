// src/store/slices/cuisinesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setOffers: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setOffers } = offersSlice.actions;
export default offersSlice.reducer;
