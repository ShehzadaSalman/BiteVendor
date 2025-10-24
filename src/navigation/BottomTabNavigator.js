import React, { useState, useCallback, useEffect } from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  getFocusedRouteNameFromRoute,
  useFocusEffect,
} from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MenuScreen from '../screens/View/MenuScreen';
import OrderHistory from '../screens/Home/OrderHistory';
import ProfileNavigator from './ProfileNavigator';
import { navigationRef } from './navigationRef';
import { COLORS, FONTS } from '../constants';
import { FONT_SIZE } from '../utils/spacing';

const Tab = createBottomTabNavigator();

const tabIcons = {
  Home: require('../assets/images/BottomTabs/Home.png'),
  Menu: require('../assets/images/BottomTabs/Menu.png'),
  Profile: require('../assets/images/BottomTabs/Profile.png'),
  Orders: require('../assets/images/user/orders.png'),
};
const renderTabIcon =
  routeName =>
  ({ color }) =>
    (
      <Image
        source={tabIcons[routeName]}
        style={{ width: 24, height: 24, tintColor: color }}
        resizeMode="contain"
      />
    );

const hideOnScreens = nestedRouteName => {
  if (
    nestedRouteName === 'OrderPlacedScreen' ||
    nestedRouteName === 'PaymentMethodScreen' ||
    nestedRouteName === 'HelpCenter' ||
    nestedRouteName === 'Profile' ||
    nestedRouteName === 'Payment' ||
    nestedRouteName === 'EditName' ||
    nestedRouteName === 'EditEmail' ||
    nestedRouteName === 'VerifyEmail' ||
    nestedRouteName === 'EditMobile' ||
    nestedRouteName === 'PastOrdersScreen' ||
    nestedRouteName === 'TermPolicy' ||
    nestedRouteName === 'TermsConditions'
  )
    return true;
  else return false;
};

const getNestedRouteName = route => {
  if (!route?.state) {
    return route.name;
  }

  const currentRoute = route.state.routes[route.state.index];

  if (currentRoute.state) {
    return getNestedRouteName(currentRoute); // Recursively call for nested state
  }

  const nestedFocusedRouteName = getFocusedRouteNameFromRoute(currentRoute);

  return nestedFocusedRouteName || currentRoute.name;
};

export default function BottomTabNavigator() {
  const [tabBarVisible, setTabBarVisible] = useState(true);
  const insets = useSafeAreaInsets();
  const handleRouteChange = () => {
    const currentRoute = navigationRef.current?.getCurrentRoute();

    if (currentRoute) {
      const nestedRouteName = getNestedRouteName(currentRoute);

      if (hideOnScreens(nestedRouteName)) {
        setTabBarVisible(false);
      } else {
        setTabBarVisible(true);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = navigationRef.current?.addListener(
      'state',
      handleRouteChange,
    );
    return () => {
      unsubscribe?.();
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      const currentRoute = navigationRef.current?.getCurrentRoute();
      if (currentRoute) {
        const nestedRouteName = getNestedRouteName(currentRoute);
        if (hideOnScreens(nestedRouteName)) {
          setTabBarVisible(false);
        } else {
          setTabBarVisible(true);
        }
      }
    }, []),
  );

  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        return {
          tabBarActiveTintColor: COLORS.white,
          tabBarInactiveTintColor: COLORS.gray,

          headerShown: false,
          headerShadowVisible: false,
          tabBarHideOnKeyboard: true,
          tabBarLabelStyle: {
            fontFamily: FONTS.medium500,
            letterSpacing: 0.3,
            fontSize: FONT_SIZE.tiny,
            paddingBottom: 10,
          },
          // tabBarStyle: {
          //   backgroundColor: COLORS.primary,
          //   height: 77,
          //   display: tabBarVisible ? 'flex' : 'none',
          // },
          tabBarStyle: {
            backgroundColor: COLORS.primary,
            height: 55 + insets.bottom, // ensures bar is above gesture area
            paddingBottom: insets.bottom,
            display: tabBarVisible ? 'flex' : 'none',
          },
          tabBarIcon: renderTabIcon(route.name),
        };
      }}
    >
      <Tab.Screen name="Home" component={AppNavigator} />
      <Tab.Screen name="Menu" component={MenuScreen} />
      <Tab.Screen name="Orders" component={OrderHistory} />
      <Tab.Screen name="Profile" component={ProfileNavigator} />
    </Tab.Navigator>
  );
}
