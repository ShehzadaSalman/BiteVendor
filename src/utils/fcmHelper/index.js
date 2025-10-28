import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import { Platform } from 'react-native';
import { navigationRef } from '../../navigation/navigationRef';

/**
 * Request notification permissions (iOS & Android 13+)
 */
export const requestUserPermission = async () => {
  try {
    console.log('📱 Requesting notification permission...');
    const authStatus = await messaging().requestPermission();
    console.log('📱 Permission status:', authStatus);

    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('✅ Notification permission granted:', authStatus);
      return true;
    } else {
      console.log('❌ Notification permission denied');
      return false;
    }
  } catch (error) {
    console.error('❌ Error requesting notification permission:', error);
    return false;
  }
};

/**
 * Create notification channels for Android
 */
export const createNotificationChannels = async () => {
  if (Platform.OS !== 'android') return;

  try {
    // New Orders - High Priority
    await notifee.createChannel({
      id: 'new_orders',
      name: 'New Orders',
      importance: AndroidImportance.HIGH,
      sound: 'default',
      vibration: true,
      vibrationPattern: [300, 500, 300, 500],
      lights: true,
      lightColor: '#17bab5',
    });

    // Order Updates - Medium Priority
    await notifee.createChannel({
      id: 'order_updates',
      name: 'Order Updates',
      importance: AndroidImportance.DEFAULT,
      sound: 'default',
      vibration: true,
      lights: true,
      lightColor: '#17bab5',
    });

    // Alerts - High Priority
    await notifee.createChannel({
      id: 'alerts',
      name: 'Important Alerts',
      importance: AndroidImportance.HIGH,
      sound: 'default',
      vibration: true,
      vibrationPattern: [500, 1000, 500, 1000],
      lights: true,
      lightColor: '#FF0000',
    });

    // General - Low Priority
    await notifee.createChannel({
      id: 'general',
      name: 'General Notifications',
      importance: AndroidImportance.LOW,
      sound: 'default',
    });

    console.log('✅ Notification channels created');
  } catch (error) {
    console.error('Error creating notification channels:', error);
  }
};

/**
 * Display notification using Notifee
 */
export const displayNotification = async (title, body, data = {}) => {
  try {
    console.log('🔔 displayNotification called:', { title, body, data });
    const { type } = data;

    // Determine channel based on notification type
    const channelId =
      type === 'new_order'
        ? 'new_orders'
        : type === 'low_stock'
        ? 'alerts'
        : type?.includes('order')
        ? 'order_updates'
        : 'general';

    console.log('🔔 Using channel:', channelId);

    const notificationId = await notifee.displayNotification({
      title,
      body,
      data,
      android: {
        channelId,
        pressAction: { id: 'default' },
        sound: 'default',
        importance:
          type === 'new_order'
            ? AndroidImportance.HIGH
            : AndroidImportance.DEFAULT,
        color: '#17bab5',
        smallIcon: 'ic_notification',
      },
      ios: {
        sound: 'default',
        foregroundPresentationOptions: {
          alert: true,
          sound: true,
          badge: true,
        },
      },
    });

    console.log('✅ Notification displayed with ID:', notificationId);
  } catch (error) {
    console.error('❌ Error displaying notification:', error);
    console.error('❌ Error details:', error.message);
  }
};

/**
 * Handle notification navigation based on type
 */
export const handleNotificationNavigation = data => {
  if (!data || !navigationRef.isReady()) return;

  const { type, order_id, item_id } = data;

  console.log('📱 Navigating from notification:', type, order_id);

  switch (type) {
    case 'new_order':
    case 'order_cancelled':
    case 'rider_assigned':
      // Navigate to order details
      if (order_id) {
        navigationRef.navigate('Orders', {
          screen: 'OrderDetail',
          params: { id: order_id },
        });
      }
      break;

    case 'low_stock':
      // Navigate to menu/inventory if you have that screen
      console.log('Navigate to inventory for item:', item_id);
      break;

    case 'payment_received':
      // Navigate to payment history if you have that screen
      console.log('Navigate to payment history');
      break;

    default:
      // Default to home
      navigationRef.navigate('Home');
  }
};

/**
 * Setup FCM listeners
 */
export const setupNotificationListeners = () => {
  console.log('🔔 Setting up notification listeners...');

  // Foreground message handler
  const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
    console.log('📱 Foreground notification received!');
    console.log('📱 Full message:', JSON.stringify(remoteMessage, null, 2));

    const { notification, data } = remoteMessage;
    console.log('📱 Notification:', notification);
    console.log('📱 Data:', data);

    if (notification) {
      console.log('📱 Displaying notification:', notification.title);
      await displayNotification(notification.title, notification.body, data);
    } else {
      console.log('⚠️ No notification object in message, data-only message');
      // Handle data-only messages
      if (data?.title && data?.body) {
        await displayNotification(data.title, data.body, data);
      }
    }
  });

  // Background notification tap handler
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('📱 App opened from background:', remoteMessage);
    handleNotificationNavigation(remoteMessage.data);
  });

  // Quit state notification tap handler
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log('📱 App opened from quit state:', remoteMessage);
        // Wait for navigation to be ready
        setTimeout(() => {
          handleNotificationNavigation(remoteMessage.data);
        }, 1000);
      }
    });

  // Notifee foreground tap handler
  const unsubscribeNotifee = notifee.onForegroundEvent(({ type, detail }) => {
    if (type === EventType.PRESS) {
      console.log('📱 Notification pressed:', detail);
      handleNotificationNavigation(detail.notification.data);
    }
  });

  // Return cleanup function
  return () => {
    unsubscribeForeground();
    unsubscribeNotifee();
  };
};

/**
 * Register iOS device for remote notifications
 */
export const registerForRemoteNotifications = async () => {
  if (Platform.OS === 'ios') {
    try {
      await messaging().registerDeviceForRemoteMessages();
      console.log('✅ iOS device registered for remote notifications');
    } catch (error) {
      console.error('Error registering iOS device:', error);
    }
  }
};

/**
 * Get FCM token
 */
export const getFCMToken = async () => {
  try {
    console.log('🔑 Requesting FCM token...');

    // Check if Google Play Services is available
    const isDeviceRegisteredForRemoteMessages =
      messaging().isDeviceRegisteredForRemoteMessages;
    console.log(
      '📱 Device registered for remote messages:',
      isDeviceRegisteredForRemoteMessages,
    );

    const token = await messaging().getToken();
    if (token) {
      console.log('✅ FCM Token obtained successfully!');
      console.log('🔑 FCM Token:', token);
      console.log('📋 Token length:', token.length);
    } else {
      console.log(
        '⚠️ No FCM token returned - Check if Google Play Services is available on emulator',
      );
    }
    return token;
  } catch (error) {
    console.error('❌ Error getting FCM token:', error);
    console.error('❌ Error details:', error.message);
    console.error(
      '⚠️ TIP: Make sure you are using an emulator with Google Play Services',
    );
    return null;
  }
};

/**
 * Initialize FCM (main entry point)
 */
export const initializeFCM = async () => {
  try {
    console.log('🚀 Initializing FCM...');

    // 1. Request permission
    const hasPermission = await requestUserPermission();
    if (!hasPermission) {
      console.log('⚠️ FCM not initialized - permission denied');
      return null;
    }

    // 2. Register iOS device
    await registerForRemoteNotifications();

    // 3. Create Android channels
    await createNotificationChannels();

    // 4. Get FCM token
    const token = await getFCMToken();

    // 5. Setup listeners
    setupNotificationListeners();

    console.log('✅ FCM initialization complete');
    console.log('📱 Notification listeners setup complete');

    return token;
  } catch (error) {
    console.error('❌ FCM initialization failed:', error);
    return null;
  }
};

/**
 * Listen for token refresh
 */
export const setupTokenRefreshListener = onTokenRefresh => {
  return messaging().onTokenRefresh(token => {
    console.log('🔄 FCM Token refreshed:', token);
    if (onTokenRefresh) {
      onTokenRefresh(token);
    }
  });
};

/**
 * Setup background message handler
 * NOTE: This must be called outside of React component lifecycle
 */
export const setupBackgroundMessageHandler = () => {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('📱 Background message received:', remoteMessage);
    // Background messages are handled by FCM automatically
    // You can add custom logic here if needed
  });
};
