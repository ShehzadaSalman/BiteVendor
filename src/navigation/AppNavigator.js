import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/HomeScreen';
import OrderHistory from '../screens/Home/OrderHistory';
import ReviewScreen from '../screens/View/ReviewScreen';

//import CartNavigator from './CartNavigator';
// import RestaurantNavigator from './RestaurantNavigator';
// import VoucherNavigator from './VoucherNavigator';
// import PaymentNavigator from './PaymentNavigator';
// import AuthenticationNavigator from './AuthenticationNavigator';
// import SplashScreen from '../screens/Authentication/SplashScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />

    <Stack.Screen name="OrderHistory" component={OrderHistory} />
    <Stack.Screen
      name="ReviewScreen"
      component={ReviewScreen}
      options={{
        headerShown: false,
      }}
    />
    {/*<Stack.Screen
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
