import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/HomeScreen';
import OrderHistory from '../screens/Home/OrderHistory';
import ReviewScreen from '../screens/View/ReviewScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />

    <Stack.Screen name="OrderHistory" component={OrderHistory} />
    <Stack.Screen name="ReviewScreen" component={ReviewScreen} />
  </Stack.Navigator>
);

export default AppNavigator;
