import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/HomeScreen';
import OrderHistory from '../screens/Home/OrderHistory';
import ReviewScreen from '../screens/View/ReviewScreen';
import OutletsScreen from '../screens/Home/OutletsScreen';
import OrderDetail from '../screens/Home/OrderDetail';

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />

    <Stack.Screen name="OrderHistory" component={OrderHistory} />
    <Stack.Screen name="OrderDetail" component={OrderDetail} />
    <Stack.Screen name="ReviewScreen" component={ReviewScreen} />
    <Stack.Screen name="OutletsScreen" component={OutletsScreen} />
  </Stack.Navigator>
);

export default AppNavigator;
