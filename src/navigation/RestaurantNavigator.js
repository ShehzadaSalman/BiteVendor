import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RestaurantScreen from '../screens/Restaurant/RestaurantScreen';
import RestaurantCategory from '../screens/Restaurant/RestaurantCategory';
import RestaurantDetailScreen from '../screens/Restaurant/RestaurantDetailScreen';
import PastOrdersScreen from '../screens/Users/PastOrdersScreen';

const Stack = createNativeStackNavigator();

const RestaurantNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="RestaurantScreen"
      component={RestaurantScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="RestaurantCategory"
      component={RestaurantCategory}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="RestaurantDetailScreen"
      component={RestaurantDetailScreen}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

export default RestaurantNavigator;
