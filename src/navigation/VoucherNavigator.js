import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import VouchersScreen from '../screens/Voucher/VouchersScreen';
import ReferFriendScreen from '../screens/Voucher/ReferFriendScreen';
import HowItWorksScreen from '../screens/Voucher/HowItWorksScreen';

const Stack = createNativeStackNavigator();

const VoucherNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="VouchersScreen" component={VouchersScreen} />
    <Stack.Screen name="ReferFriend" component={ReferFriendScreen} />
    <Stack.Screen name="HowItWorks" component={HowItWorksScreen} />
  </Stack.Navigator>
);

export default VoucherNavigator;
