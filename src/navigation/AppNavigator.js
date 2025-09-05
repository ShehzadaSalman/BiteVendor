import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';

//import CartNavigator from './CartNavigator';
// import RestaurantNavigator from './RestaurantNavigator';
// import VoucherNavigator from './VoucherNavigator';
// import PaymentNavigator from './PaymentNavigator';
// import AuthenticationNavigator from './AuthenticationNavigator';
// import SplashScreen from '../screens/Authentication/SplashScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerShown: false,
      }}
    />
    {/* 
    <Stack.Screen
      name="Restaurant"
      component={RestaurantNavigator}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="SplashScreen"
      component={SplashScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Authentication"
      component={AuthenticationNavigator}
      options={{
        headerShown: false,
      }}
    />

    <Stack.Screen
      name="Cart"
      component={CartNavigator}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Vouchers"
      component={VoucherNavigator}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Payment"
      component={PaymentNavigator}
      options={{
        headerShown: false,
      }}
    /> */}
  </Stack.Navigator>
);

export default AppNavigator;
