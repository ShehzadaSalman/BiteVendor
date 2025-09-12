import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../../constants'; // adjust path
import { FONT_SIZE } from '../../utils/spacing';

export default function OrderSummaryComponent({ isVisible = false }) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Order Summary</Text>
      {isVisible && (
        <View style={[styles.summaryRow, styles.divider]}>
          <Text style={[styles.summaryLabel, styles.blackText]}>
            1 X Chicken Biryani
          </Text>
          <Text style={styles.summaryValue}>Rs. 800</Text>
        </View>
      )}
      <View style={styles.summaryRow}>
        <Text style={[styles.summaryLabel, styles.grayText]}>Subtotal</Text>
        <Text style={[styles.summaryValue, styles.grayText]}>Rs. 500</Text>
      </View>
      <View style={styles.summaryRow}>
        <Text style={[styles.summaryLabel, styles.grayText]}>
          Standard Delivery
        </Text>
        <Text style={[styles.summaryValue, styles.grayText]}>Rs. 100</Text>
      </View>
      <View style={styles.summaryRow}>
        <Text style={[styles.summaryLabel, styles.grayText]}>Platform Fee</Text>
        <Text style={[styles.summaryValue, styles.grayText]}>Rs. 10</Text>
      </View>
      {isVisible && (
        <>
          <View style={styles.divider} />
          <Text style={styles.termsText}>
            By completing this order, i agree to all{' '}
            <Text style={{ fontWeight: 'bold', color: COLORS.text }}>
              terms & conditions.
            </Text>
          </Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, marginTop: 24 },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  summaryLabel: {
    fontFamily: FONTS.medium500,
    fontSize: FONT_SIZE.xSmall,
    fontWeight: '500',
    //fontWeight: 'bold',
  },
  blackText: {
    color: COLORS.text,
  },
  grayText: {
    color: COLORS.grayText1,
  },
  termsText: {
    fontFamily: FONTS.medium500,
    fontWeight: '500',
    fontSize: FONT_SIZE.small,
    color: COLORS.grayText1,
    //fontWeight: 'bold',
  },
  summaryValue: {
    fontFamily: FONTS.medium500,
    fontSize: FONT_SIZE.xSmall,
    fontWeight: '500',
  },
  sectionSub: {
    fontSize: FONT_SIZE.small,
    fontFamily: FONTS.medium500,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.medium,
    fontFamily: FONTS.bold700,
    marginBottom: 6,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  divider: {
    borderBottomColor: COLORS.black,
    borderBottomWidth: 1,
    paddingBottom: 22,
    marginVertical: 12,
  },
});
