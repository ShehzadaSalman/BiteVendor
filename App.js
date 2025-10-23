import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider, useSelector } from 'react-redux';

import axios from 'axios';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import AuthenticationNavigator from './src/navigation/AuthenticationNavigator';
import SplashScreen from './src/screens/Authentication/SplashScreen';
import { navigationRef } from './src/navigation/navigationRef';
import { FilterChartProvider } from './src/services/FilterChartProvider';
import { VendorProvider } from './src/services/VendorProvider';
import { store } from './src/redux/store';

function RootNavigation() {
  const [loading, setLoading] = useState(true);
  const isSignedIn = useSelector(state => state.auth.isSignedIn); // Change based on your redux state

  useEffect(() => {
    // Push notifications via Firebase have been removed.
  }, []);

  useEffect(() => {
    // Simulate loading splash (e.g. check auth token, preload assets)
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds splash

    return () => clearTimeout(timeout);
  }, []);
  if (loading) {
    return <SplashScreen />;
  }

  return isSignedIn ? <BottomTabNavigator /> : <AuthenticationNavigator />;
}

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Provider store={store}>
          <FilterChartProvider>
            <VendorProvider>
              <NavigationContainer ref={navigationRef}>
                <RootNavigation />
              </NavigationContainer>
            </VendorProvider>
          </FilterChartProvider>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
