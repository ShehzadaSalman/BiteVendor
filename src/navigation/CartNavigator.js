import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CartScreen from '../screens/Cart/CartScreen';
import CartDeliveryAddressScreen from '../screens/Cart/CartDeliveryAddressScreen';
import CartPaymentMethodScreen from '../screens/Cart/CartPaymentMethodScreen';
import OrderPlacedScreen from '../screens/Cart/OrderPlacedScreen';
import DeliveryTimeScreen from '../screens/Cart/DeliveryTimeScreen';

const Stack = createNativeStackNavigator();

const CartNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="CartScreen"
      component={CartScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="CartDeliveryAddressScreen"
      component={CartDeliveryAddressScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="DeliveryTimeScreen"
      component={DeliveryTimeScreen}
      options={{
        headerShown: false,
      }}
    />

    <Stack.Screen
      name="OrderPlacedScreen"
      component={OrderPlacedScreen}
      options={{
        headerShown: false,
      }}
    />

    <Stack.Screen
      name="CartPaymentMethodScreen"
      component={CartPaymentMethodScreen}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

export default CartNavigator;
