// src/store/slices/cuisinesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [
    // {
    //   label: 'Burger',
    //   icon: require('../../assets/images/Home/Cusine/burger.png'),
    // },
    // {
    //   label: 'Pizza',
    //   icon: require('../../assets/images/Home/Cusine/pizza.png'),
    // },
    // {
    //   label: 'Healthy',
    //   icon: require('../../assets/images/Home/Cusine/healthy.png'),
    // },
    // {
    //   label: 'Coffee',
    //   icon: require('../../assets/images/Home/Cusine/coffee.png'),
    // },
    // {
    //   label: 'Desert',
    //   icon: require('../../assets/images/Home/Cusine/dessert.png'),
    // },
    // {
    //   label: 'Biryani',
    //   icon: require('../../assets/images/Home/Cusine/biryani.png'),
    // },
    // Add more categories
  ],
};

const cuisinesSlice = createSlice({
  name: 'cuisines',
  initialState,
  reducers: {
    setCuisines: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setCuisines } = cuisinesSlice.actions;
export default cuisinesSlice.reducer;
