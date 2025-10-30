/**
 * @format
 */

import { AppRegistry } from 'react-native';
import notifee, { EventType } from '@notifee/react-native';
import App from './App';
import { name as appName } from './app.json';
import { handleNotificationNavigation } from './src/utils/fcmHelper';

notifee.onBackgroundEvent(async ({ type, detail }) => {
  if (type === EventType.PRESS) {
    handleNotificationNavigation(detail?.notification?.data);
  }
});

AppRegistry.registerComponent(appName, () => App);
