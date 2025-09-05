// src/utils/layout.js
import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export const STATUS_BAR_HEIGHT = Platform.select({
  ios: 44,
  android: 24,
  default: 0,
});
