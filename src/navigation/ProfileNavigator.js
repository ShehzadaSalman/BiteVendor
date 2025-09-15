import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserProfileScreen from '../screens/Users/UserProfileScreen';
import ProfileScreen from '../screens/Users/ProfileScreen';
import EditNameScreen from '../screens/Users/EditNameScreen';
import EditEmailScreen from '../screens/Users/EditEmailScreen';
import EditMobileScreen from '../screens/Users/EditMobileScreen';
import VerifyEmailScreen from '../screens/Users/VerifyEmailScreen';
import HelpCenterScreen from '../screens/Users/HelpCenterScreen';
import TermsPolicyScreen from '../screens/Users/TermsPolicyScreen';
import TermsConditionsScreen from '../screens/Users/TermsConditionsScreen';
import DataPolicyScreen from '../screens/Users/DataPolicyScreen';
import PaymentNavigator from './PaymentNavigator';
import PromotionsNavigator from './PromotionsNavigator';

const Stack = createNativeStackNavigator();

const ProfileNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />
    <Stack.Screen name="Payment" component={PaymentNavigator} />
    <Stack.Screen name="EditName" component={EditNameScreen} />
    <Stack.Screen name="EditEmail" component={EditEmailScreen} />
    <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
    <Stack.Screen name="EditMobile" component={EditMobileScreen} />
    <Stack.Screen name="Promotions" component={PromotionsNavigator} />
    <Stack.Screen name="TermPolicy" component={TermsPolicyScreen} />
    <Stack.Screen name="TermsConditions" component={TermsConditionsScreen} />
    <Stack.Screen name="DataPolicy" component={DataPolicyScreen} />
  </Stack.Navigator>
);

export default ProfileNavigator;
