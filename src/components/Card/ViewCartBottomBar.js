import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '../../constants'; // adjust path
import { FONT_SIZE } from '../../utils/spacing';
import { isIOS } from '../../utils/layout';

export default function ViewCartBottomBar({
  itemCount,
  restaurantName,
  totalAmount,
  onPress,
}) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom || 12 }]}>
      <TouchableOpacity
        style={styles.touchable}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{itemCount}</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.title}>View your cart</Text>
          <Text style={styles.subtitle}>{restaurantName}</Text>
        </View>

        <Text style={styles.amount}>Rs. {totalAmount}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0.1,
    right: 0.1,
    bottom: 0, // stick to bottom and rely on safe inset padding
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  touchable: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginBottom: isIOS ? 0 : 12,
    justifyContent: 'space-between',
    // Common for both platforms
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 1, // lower the elevation for lighter shadow
        // shadowColor: 'transparent', // disables default dark shadow (optional)
      },
    }),
  },
  badge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  badgeText: {
    color: COLORS.white,
    fontFamily: FONTS.semiBold600,
    fontSize: FONT_SIZE.normal,
    fontWeight: '600',
  },
  info: {
    flex: 1,
  },
  title: {
    color: COLORS.text,
    fontFamily: FONTS.semiBold600,
    fontSize: FONT_SIZE.normal,
    fontWeight: '600',
  },
  subtitle: {
    color: COLORS.text,
    fontFamily: FONTS.regular400,
    fontWeight: '400',
    fontSize: FONT_SIZE.small,
    opacity: 0.9,
  },
  amount: {
    color: COLORS.text,
    fontFamily: FONTS.semiBold600,
    fontWeight: '600',
    fontSize: FONT_SIZE.normal,
    marginLeft: 12,
  },
});
