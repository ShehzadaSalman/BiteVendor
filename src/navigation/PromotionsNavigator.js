import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PromotionsScreen from '../screens/Promotions/PromotionsScreen';
import AddPromotion from '../screens/Promotions/AddPromotion';
import UpdatedPromotion from '../screens/Promotions/UpdatedPromotion';

const Stack = createNativeStackNavigator();

const PromotionsNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="PromotionsScreen" component={PromotionsScreen} />
    <Stack.Screen name="AddPromotions" component={AddPromotion} />
    <Stack.Screen name="UpdatedPromotion" component={UpdatedPromotion} />
  </Stack.Navigator>
);

export default PromotionsNavigator;
