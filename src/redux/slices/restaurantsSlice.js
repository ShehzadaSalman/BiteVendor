// src/store/slices/restaurantsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [
    // {
    //   name: 'kababJees',
    //   rating: '1.4K',
    //   subrating: '(1000)',
    //   image: require('../../assets/images/Home/ExploreRestaurant/kababJees.png'),
    //   subTitle: 'Fast Food, Italian, Pizza',
    //   time: '20 -30',
    //   type: 'fast food',
    //   rider: 'Rs.200',
    // },
    // {
    //   name: 'Cheezious',
    //   rating: '1.4K',
    //   subrating: '(1000)',
    //   image: require('../../assets/images/Home/ExploreRestaurant/Cheezious.png'),
    //   subTitle: 'Fast Food, Italian, Pizza',
    //   time: '20 -30',
    //   type: 'pakistani',
    //   rider: 'Rs.200',
    // },
    // {
    //   name: 'Sweet Creme',
    //   rating: '1.4K',
    //   subrating: '(1000)',
    //   image: require('../../assets/images/Home/ExploreRestaurant/SweetCreme.png'),
    //   subTitle: 'Dessert',
    //   time: '20 -30',
    //   type: 'pakistani',
    //   rider: 'Rs.200',
    // },
    // {
    //   name: 'kababJees',
    //   rating: '1.4K',
    //   subrating: '(1000)',
    //   image: require('../../assets/images/Home/ExploreRestaurant/kababJees.png'),
    //   subTitle: 'Fast Food, Italian, Pizza',
    //   time: '20 -30',
    //   type: 'fast food',
    //   rider: 'Rs.200',
    // },
    // {
    //   name: 'Cheezious',
    //   rating: '1.4K',
    //   subrating: '(1000)',
    //   image: require('../../assets/images/Home/ExploreRestaurant/Cheezious.png'),
    //   subTitle: 'Fast Food, Italian, Pizza',
    //   time: '20 -30',
    //   type: 'pakistani',
    //   rider: 'Rs.200',
    // },
    // Add more cards
  ],
};

const restaurantsSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    setRestaurants: (state, action) => {
      state.list = action.payload;
    },
    addRestaurant: (state, action) => {
      state.list.push(action.payload);
    },
  },
});

export const { setRestaurants, addRestaurant } = restaurantsSlice.actions;
export default restaurantsSlice.reducer;
