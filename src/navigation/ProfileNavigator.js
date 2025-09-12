import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserProfileScreen from '../screens/Users/UserProfileScreen';
import ProfileScreen from '../screens/Users/ProfileScreen';
import EditNameScreen from '../screens/Users/EditNameScreen';
import EditEmailScreen from '../screens/Users/EditEmailScreen';
import EditMobileScreen from '../screens/Users/EditMobileScreen';
import VerifyEmailScreen from '../screens/Users/VerifyEmailScreen';
// import AddAddressScreen from '../screens/Address/AddAddressScreen';
// import MapAddressScreen from '../screens/Address/MapAddressScreen';
// import VouchersScreen from '../screens/Voucher/VouchersScreen';
// import ReferFriendScreen from '../screens/Voucher/ReferFriendScreen';
// import HowItWorksScreen from '../screens/Voucher/HowItWorksScreen';
// import PastOrdersScreen from '../screens/Users/PastOrdersScreen';
// import FavouriteScreen from '../screens/Favourite/FavouriteScreen';
import HelpCenterScreen from '../screens/Users/HelpCenterScreen';
//import BiteCreditScreen from '../screens/Payment/BiteCreditScreen';
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
    <Stack.Screen name="PaymentNavigator" component={PaymentNavigator} />
    {/* <Stack.Screen name="VouchersScreen" component={VouchersScreen} />
    <Stack.Screen name="ReferFriend" component={ReferFriendScreen} />
    <Stack.Screen name="HowItWorks" component={HowItWorksScreen} /> 
    <Stack.Screen name="AddAddress" component={AddAddressScreen} />
    <Stack.Screen name="MapAddress" component={MapAddressScreen} />
    <Stack.Screen name="Favourite" component={FavouriteScreen} />*/}
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
