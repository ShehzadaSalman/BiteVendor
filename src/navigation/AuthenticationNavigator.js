import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Authentication/LoginScreen';
import PhoneLoginScreen from '../screens/Authentication/PhoneLoginScreen';

const Stack = createNativeStackNavigator();

const AuthenticationNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="PhoneLoginScreen" component={PhoneLoginScreen} />
  </Stack.Navigator>
);

export default AuthenticationNavigator;
