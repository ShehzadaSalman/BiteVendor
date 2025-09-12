import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../constants';

import { FONT_SIZE } from '../../utils/spacing';

export default function OrderDetailsComponent() {
  const orderDetails = {
    restaurant: 'Kababjees',
    orderNumber: '#123456',
    address: '1-P, Main Boulevard, Phase 2, Johar Town, Lahore',
    items: [{ name: 'Burger', qty: 1, price: 800 }],
    subtotal: 800,
    delivery: 150,
    discount: 0,
    serviceFee: 15,
    vat: 2,
    paidWith: 'Cash on Delivery',
    total: 825,
  };
  return (
    <View>
      <Text style={styles.sectionTitle}>Order Details</Text>
      <View style={styles.detailsRow}>
        <Text style={styles.label}>Your Order From</Text>
        <Text style={styles.value}>{orderDetails.restaurant}</Text>
      </View>
      <View style={styles.detailsRow}>
        <Text style={styles.label}>Your Order Number</Text>
        <Text style={styles.value}>{orderDetails.orderNumber}</Text>
      </View>

      <View
        style={[
          styles.detailsRow,
          {
            alignItems: 'flex-start',
          },
        ]}
      >
        <Text style={styles.label}>Delivery Address</Text>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>{orderDetails.address}</Text>
        </View>
      </View>

      {orderDetails.items.map((item, index) => (
        <View key={index} style={styles.itemRow}>
          <Text style={styles.orderValue}>
            {item.qty} × {item.name}
          </Text>
          <Text style={styles.orderValue}>{item.price}</Text>
        </View>
      ))}

      <View style={styles.breakdownRow}>
        <Text style={styles.breakdownlabel}>Subtotal</Text>
        <Text style={styles.breakdownlabel}>
          Rs. {orderDetails.subtotal}.00
        </Text>
      </View>
      <View style={styles.breakdownRow}>
        <Text style={styles.breakdownlabel}>Standard Delivery</Text>
        <Text style={styles.breakdownlabel}>
          Rs. {orderDetails.delivery}.00
        </Text>
      </View>
      <View style={styles.breakdownRow}>
        <Text style={styles.breakdownlabel}>Discount</Text>
        <Text style={styles.breakdownlabel}>Rs. {orderDetails.discount}</Text>
      </View>
      <View style={styles.breakdownRow}>
        <Text style={styles.breakdownlabel}>Service Fee</Text>
        <Text style={styles.breakdownlabel}>Rs. {orderDetails.serviceFee}</Text>
      </View>
      <View style={styles.breakdownRow}>
        <Text style={styles.breakdownlabel}>VAT</Text>
        <Text style={styles.breakdownlabel}>Rs. {orderDetails.vat}</Text>
      </View>

      <View style={styles.paidWith}>
        <Text style={styles.paidWithTitle}>Paid with</Text>
        <View style={styles.paidWithRow}>
          <Text style={styles.paidWithlabel}>{orderDetails.paidWith}</Text>
          <Text style={styles.paidWithlabel}>Rs. {orderDetails.total}.00</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontFamily: FONTS.bold700,
    fontSize: FONT_SIZE.large,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  valueContainer: {
    flexShrink: 1, // allows the right side to wrap!
    alignItems: 'flex-end', // optional, align text to right
    maxWidth: '50%', // optional, to limit how wide it can grow
  },

  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontFamily: FONTS.medium500,
    fontSize: FONT_SIZE.normal,
    color: COLORS.grayText1,
  },
  value: {
    fontFamily: FONTS.medium500,
    fontSize: FONT_SIZE.normal,
    fontWeight: '500',
    color: COLORS.text,
    lineHeight: FONT_SIZE.normal * 1.25,
  },
  orderValue: {
    fontFamily: FONTS.semiBold600,
    fontSize: FONT_SIZE.medium,
    fontWeight: '600',
    color: COLORS.text,
    lineHeight: FONT_SIZE.medium * 1.5,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  breakdownlabel: {
    fontFamily: FONTS.medium500,
    fontSize: FONT_SIZE.normal,
    fontWeight: '500',
    color: COLORS.grayText1,
    lineHeight: FONT_SIZE.normal * 1.5,
  },
  paidWithRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  paidWithTitle: {
    fontFamily: FONTS.bold700,
    fontSize: FONT_SIZE.large,
    fontWeight: 'bold',
    color: COLORS.text,
    lineHeight: FONT_SIZE.normal * 1.5,
  },
  paidWithlabel: {
    fontFamily: FONTS.medium500,
    fontWeight: '500',
    fontSize: FONT_SIZE.normal,
    color: COLORS.grayText1,
    lineHeight: FONT_SIZE.normal * 1.5,
  },
  paidWith: {
    marginTop: 20,
    paddingVertical: 10,
    marginBottom: 100,
  },
});
