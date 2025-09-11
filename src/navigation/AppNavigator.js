import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/HomeScreen';
import OrderHistory from '../screens/Home/OrderHistory';
import ReviewScreen from '../screens/View/ReviewScreen';
import PromotionsScreen from '../screens/Promotions/PromotionsScreen';
import AddPromotion from '../screens/Promotions/AddPromotion';
import UpdatedPromotion from '../screens/Promotions/UpdatedPromotion';

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="PromotionsScreen" component={PromotionsScreen} />
    <Stack.Screen name="Home" component={HomeScreen} />

    <Stack.Screen name="OrderHistory" component={OrderHistory} />
    <Stack.Screen name="ReviewScreen" component={ReviewScreen} />
    <Stack.Screen name="AddPromotions" component={AddPromotion} />
    <Stack.Screen name="UpdatedPromotion" component={UpdatedPromotion} />
  </Stack.Navigator>
);

export default AppNavigator;
