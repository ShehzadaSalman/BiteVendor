// src/store/slices/cuisinesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [
    // {
    //   name: 'kababJees',
    //   rating: '1.4K',
    //   subrating: '(1000)',
    //   image: require('../../assets/images/Home/ExploreRestaurant/kababJees.png'),
    //   time: '20-30',
    //   total: '$$$',
    //   rider: 'Rs.200',
    //   distance: '4.5 km',
    // },
    // {
    //   name: 'Cheezious',
    //   rating: '1.4K',
    //   subrating: '(1000)',
    //   image: require('../../assets/images/Home/ExploreRestaurant/Cheezious.png'),
    //   time: '20-30',
    //   total: '$$$',
    //   rider: 'Rs.200',
    //   distance: '4.5 km',
    // },
    // {
    //   name: 'Sweet Creme',
    //   rating: '1.4K',
    //   subrating: '(1000)',
    //   image: require('../../assets/images/Home/ExploreRestaurant/SweetCreme.png'),
    //   time: '20-30',
    //   total: '$$$',
    //   rider: 'Rs.200',
    //   distance: '4.5 km',
    // },
    // {
    //   name: 'kababJees',
    //   rating: '1.4K',
    //   subrating: '(1000)',
    //   image: require('../../assets/images/Home/ExploreRestaurant/kababJees.png'),
    //   time: '20-30',
    //   total: '$$$',
    //   rider: 'Rs.200',
    //   distance: '4.5 km',
    // },
    // {
    //   name: 'Cheezious',
    //   rating: '1.4K',
    //   subrating: '(1000)',
    //   image: require('../../assets/images/Home/ExploreRestaurant/Cheezious.png'),
    //   time: '20-30',
    //   total: '$$$',
    //   rider: 'Rs.200',
    //   distance: '4.5 km',
    // },
    // Add more cards
  ],
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    setFavourites: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setFavourites } = favouritesSlice.actions;
export default favouritesSlice.reducer;
