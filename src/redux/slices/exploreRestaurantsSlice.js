// src/store/slices/restaurantsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [
    // {
    //   name: 'kababJees',
    //   image: require('../../assets/images/Home/Featured/kababJees.png'),
    //   subTitle: 'Fast Food, Italian, Pizza',
    //   time: '20 -30',
    //   type: 'fast food',
    // },
    // {
    //   name: 'Cheezious',
    //   image: require('../../assets/images/Home/Featured/Cheezious.png'),
    //   subTitle: 'Fast Food, Italian, Pizza',
    //   time: '20 -30',
    //   type: 'pakistani',
    // },
    // {
    //   name: 'kababJees',
    //   image: require('../../assets/images/Home/Featured/kababJees.png'),
    //   subTitle: 'Fast Food, Italian, Pizza',
    //   time: '20 -30',
    //   type: 'fast food',
    // },
    // {
    //   name: 'Cheezious',
    //   image: require('../../assets/images/Home/Featured/Cheezious.png'),
    //   subTitle: 'Fast Food, Italian, Pizza',
    //   time: '20 -30',
    //   type: 'pakistani',
    // },
    // Add more cards
  ],
};

const exploreRestaurantsSlice = createSlice({
  name: 'exploreRestaurants',
  initialState,
  reducers: {
    setExploreRestaurants: (state, action) => {
      state.list = action.payload;
    },
    addExploreRestaurant: (state, action) => {
      state.list.push(action.payload);
    },
  },
});

export const { setExploreRestaurants, addExploreRestaurant } =
  exploreRestaurantsSlice.actions;
export default exploreRestaurantsSlice.reducer;
