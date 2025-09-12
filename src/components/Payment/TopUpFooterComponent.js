import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '../../constants';
import { BORDER_RADIUS, FONT_SIZE } from '../../utils/spacing';
import { useNavigation } from '@react-navigation/native';
import { isIOS } from '../../utils/layout';

export default function TopUpFooterComponent() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.footer, { paddingBottom: insets.bottom || 12 }]}>
      <View style={styles.totalBox}>
        <Text style={styles.totalLabel}>Top-up amount</Text>
        <Text style={styles.totalPrice}>Rs. 0.00</Text>
      </View>
      <TouchableOpacity
        style={styles.ctaButton}
        onPress={() => navigation.goBack()} //navigation.navigate('CartDeliveryAddressScreen')}
      >
        <Text style={styles.ctaText}>Confirm Top-up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0.1,
    backgroundColor: COLORS.primary,
    width: '100%',
    padding: 16,
    paddingBottom: 30,
    //borderTopWidth: 1,
  },
  totalBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  totalLabel: {
    color: COLORS.white,
    fontFamily: FONTS.semiBold600,
    fontSize: FONT_SIZE.normal,
    fontWeight: '600',
  },
  subTotalLabel: {
    color: COLORS.white,
    fontFamily: FONTS.regular400,
    fontSize: FONT_SIZE.xSmall,
  },
  totalPrice: {
    color: COLORS.white,
    fontFamily: FONTS.semiBold600,
    fontSize: FONT_SIZE.normal,
    fontWeight: '600',
  },
  ctaButton: {
    backgroundColor: COLORS.background,
    paddingVertical: 8,
    borderRadius: BORDER_RADIUS.large,
    alignItems: 'center',
    marginBottom: isIOS ? 0 : 12,
  },
  ctaText: {
    color: COLORS.primary,
    fontWeight: '600',
    fontFamily: FONTS.semiBold600,
    fontSize: FONT_SIZE.xSmall,
  },
});
