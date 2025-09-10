import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [
    // {
    //   label: 'Resturants',
    //   icon: require('../../assets/images/Home/Order/Restaurants.png'),
    //   navigation: 'Restaurant',
    //   isParent: false,
    // },
    // {
    //   label: 'Pharmacy',
    //   icon: require('../../assets/images/Home/Order/Pharmacy.png'),
    //   navigation: 'Pharmacy',
    //   isParent: true,
    // },
    // {
    //   label: 'Pick-Up',
    //   icon: require('../../assets/images/Home/Order/PickUp.png'),
    //   navigation: 'Cart',
    //   isParent: false,
    // },
    // {
    //   label: 'Home Chefs',
    //   icon: require('../../assets/images/Home/Order/Chefs.png'),
    //   navigation: 'Restaurant',
    //   isParent: false,
    // },
    // {
    //   label: 'Offers',
    //   icon: require('../../assets/images/Home/Order/Offers.png'),
    //   navigation: 'Restaurant',
    //   isParent: false,
    // },
  ],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
