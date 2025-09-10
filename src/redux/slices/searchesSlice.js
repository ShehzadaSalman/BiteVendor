// src/store/slices/searchesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  recent: [],
};

const searchesSlice = createSlice({
  name: 'searches',
  initialState,
  reducers: {
    addRecentSearch: (state, action) => {
      if (!state.recent.includes(action.payload)) {
        state.recent.unshift(action.payload);
      }
    },
    clearRecentSearches: state => {
      state.recent = [];
    },
  },
});

export const { addRecentSearch, clearRecentSearches } = searchesSlice.actions;
export default searchesSlice.reducer;
