import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BiteCreditScreen from '../screens/Payment/BiteCreditScreen';
import GiftCardScreen from '../screens/Payment/GiftCardScreen';
import TopUpCreditScreen from '../screens/Payment/TopUpCreditScreen';
import PaymentMethodScreen from '../screens/Payment/PaymentMethodScreen';
import AddCreditDebitCardScreen from '../screens/Payment/AddCreditDebitCardScreen';

const Stack = createNativeStackNavigator();

const PaymentNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="creditScreen" component={BiteCreditScreen} />
    <Stack.Screen name="GiftCardScreen" component={GiftCardScreen} />
    <Stack.Screen name="TopUpCreditScreen" component={TopUpCreditScreen} />
    <Stack.Screen name="PaymentMethodScreen" component={PaymentMethodScreen} />
    <Stack.Screen
      name="AddCreditDebitCardScreen"
      component={AddCreditDebitCardScreen}
    />
  </Stack.Navigator>
);

export default PaymentNavigator;
