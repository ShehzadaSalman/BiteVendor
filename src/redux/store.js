import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import authReducer from './slices/authSlice';
import cuisinesReducer from './slices/cuisinesSlice';
import favouritesReducer from './slices/favouritesSlice';
import offersReducer from './slices/offersSlice';
import pharmacyReducer from './slices/pharmacySlice';
import restaurantsReducer from './slices/restaurantsSlice';
import searchesReducer from './slices/searchesSlice';
import ordersReducer from './slices/ordersSlice';
import exploreRestaurantsReducer from './slices/exploreRestaurantsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    restaurants: restaurantsReducer,
    cuisines: cuisinesReducer,
    searches: searchesReducer,
    favourites: favouritesReducer,
    offers: offersReducer,
    pharmacy: pharmacyReducer,
    orders: ordersReducer,
    exploreRestaurants: exploreRestaurantsReducer,
  },
});
