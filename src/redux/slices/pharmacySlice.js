// src/store/slices/searchesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
};

const pharmacySlice = createSlice({
  name: 'pharmcy',
  initialState,
  reducers: {
    addPharmacies: (state, action) => {
      if (!state.list.includes(action.payload)) {
        state.list.unshift(action.payload);
      }
    },
    clearPharmacy: state => {
      state.list = [];
    },
  },
});

export const { addPharmacies, clearPharmacy } = pharmacySlice.actions;
export default pharmacySlice.reducer;
