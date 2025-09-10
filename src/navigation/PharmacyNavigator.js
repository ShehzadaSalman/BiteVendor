import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//import DeliveryTimeScreen from '../screens/Cart/DeliveryTimeScreen';
import TopPharmacy from '../screens/Pharmacy/TopPharmacy';
//import PharmacyScreen from '../screens/Pharmacy/PharmacyScreen';

const Stack = createNativeStackNavigator();

const PharmacyNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="TopPharmacy"
      component={TopPharmacy}
      options={{
        headerShown: false,
      }}
    />
    {/* <Stack.Screen
      name="PharmacyScreen"
      component={PharmacyScreen}
      options={{
        headerShown: false,
      }}
    /> */}
  </Stack.Navigator>
);

export default PharmacyNavigator;
