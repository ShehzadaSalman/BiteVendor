import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderHistory from '../screens/Home/OrderHistory';
import OrderDetail from '../screens/Home/OrderDetail';

const Stack = createNativeStackNavigator();

export default function OrdersNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OrderHistory" component={OrderHistory} />
      <Stack.Screen name="OrderDetail" component={OrderDetail} />
    </Stack.Navigator>
  );
}
