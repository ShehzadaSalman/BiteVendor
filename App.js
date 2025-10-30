import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider, useSelector } from 'react-redux';
import { Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';

import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import AuthenticationNavigator from './src/navigation/AuthenticationNavigator';
import SplashScreen from './src/screens/Authentication/SplashScreen';
import { navigationRef } from './src/navigation/navigationRef';
import { FilterChartProvider } from './src/services/FilterChartProvider';
import { VendorProvider } from './src/services/VendorProvider';
import { MenuProvider } from './src/services/MenuProvider';
import { store } from './src/redux/store';
import { useVendor } from './src/services/VendorProvider';
import {
  initializeFCM,
  setupTokenRefreshListener,
  processPendingNotificationNavigation,
} from './src/utils/fcmHelper';

// Setup background message handler (must be outside component)
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('📱 Background message received:', remoteMessage);
});

function RootNavigation() {
  const [loading, setLoading] = useState(true);
  const isSignedIn = useSelector(state => state.auth.isSignedIn);
  const auth = useSelector(state => state.auth);
  const { vendor } = useVendor();

  // Initialize FCM when user is signed in
  useEffect(() => {
    let unsubscribeTokenRefresh = null;

    const setupFCM = async () => {
      try {
        console.log('🚀 Setting up FCM for vendor...');
        console.log('📋 Auth status:', {
          isSignedIn,
          hasAuthToken: !!auth?.user?.token,
          hasVendorId: !!vendor?.id,
          vendorId: vendor?.id,
        });

        // Initialize FCM
        const token = await initializeFCM();

        if (!token) {
          console.log('⚠️ FCM token not available');
          return;
        }

        // Send token to backend
        const apiToken = auth?.user?.token;
        const vendorId = vendor?.id;

        if (apiToken && vendorId) {
          try {
            console.log('📤 Sending device token to backend...', {
              token: token,
              platform: Platform?.OS,
              locale: 'en',
            });
            await axios.post(
              'https://development.bite.com.pk/api/device-token',
              {
                // device_token: token,
                // platform: Platform.OS, // 'ios' or 'android'
                // device_type: 'vendor', // Identify as vendor device
                // vendor_id: vendorId,
                token: token,
                platform: Platform?.OS,
                locale: 'en',
              },
              {
                headers: {
                  Authorization: `Bearer ${apiToken}`,
                  'Content-Type': 'application/json',
                },
              },
            );
            console.log('✅ Device token sent successfully to backend');
          } catch (error) {
            console.error('❌ Failed to send device token:', {
              message: error.message,
              status: error.response?.status,
              data: error.response?.data,
            });
          }
        } else {
          console.log('⚠️ Cannot send device token:', {
            hasApiToken: !!apiToken,
            hasVendorId: !!vendorId,
          });
        }

        // Setup token refresh listener
        unsubscribeTokenRefresh = setupTokenRefreshListener(async newToken => {
          console.log('🔄 Token refreshed, sending to backend...');
          if (apiToken && vendorId) {
            try {
              await axios.post(
                'https://development.bite.com.pk/api/device-token',
                {
                  // device_token: newToken,
                  // platform: Platform.OS,
                  // device_type: 'vendor',
                  // vendor_id: vendorId,
                  token: newToken,
                  platform: Platform?.OS,
                  locale: 'en',
                },
                {
                  headers: {
                    Authorization: `Bearer ${apiToken}`,
                    'Content-Type': 'application/json',
                  },
                },
              );
              console.log('✅ Refreshed token sent successfully');
            } catch (error) {
              console.error('❌ Failed to send refreshed token:', {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
              });
            }
          }
        });
      } catch (error) {
        console.error('❌ FCM setup failed:', error);
      }
    };

    if (isSignedIn && auth?.user?.token && vendor?.id) {
      console.log('✅ All conditions met, starting FCM setup...');
      setupFCM();
    } else {
      console.log('⏳ Waiting for conditions:', {
        isSignedIn,
        hasAuthToken: !!auth?.user?.token,
        hasVendorId: !!vendor?.id,
      });
    }

    return () => {
      if (unsubscribeTokenRefresh) {
        unsubscribeTokenRefresh();
      }
    };
  }, [isSignedIn, auth?.user?.token, vendor?.id]);

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

  return (
    <>{isSignedIn ? <BottomTabNavigator /> : <AuthenticationNavigator />}</>
  );
}

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Provider store={store}>
          <FilterChartProvider>
            <VendorProvider>
              <MenuProvider>
                <NavigationContainer
                  ref={navigationRef}
                  onReady={processPendingNotificationNavigation}
                >
                  <RootNavigation />
                </NavigationContainer>
              </MenuProvider>
            </VendorProvider>
          </FilterChartProvider>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
