import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { COLORS, FONTS } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BORDER_RADIUS, FONT_SIZE } from '../../utils/spacing';
import HeaderComponent from '../../components/HeaderComponent';

export default function GiftCardScreen() {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <HeaderComponent leftIcon="chevron" title="Gift Card" />
      <View style={styles.container}>
        <View style={styles.giftCreditBox}>
          <Text style={styles.biteCreditText}>Total available balance</Text>

          <Text style={styles.giftCreditSubText}>RS. 0.00</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
  },
  container: {
    padding: 20,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    textAlign: 'center',
  },

  giftCreditBox: {
    padding: 16,
    borderRadius: BORDER_RADIUS.tiny,
    marginVertical: 16,
    justifyContent: 'center',
    alignItems: 'center', // ✅ Add this
  },

  biteCreditText: {
    fontFamily: FONTS.medium500,
    fontWeight: '500',
    fontSize: FONT_SIZE.normal,
    color: COLORS.text,
  },
  giftCreditSubText: {
    fontFamily: FONTS.black900,
    fontSize: FONT_SIZE.xlarge,
    fontWeight: 'black',
    color: COLORS.primary,
    marginTop: 5,
  },
});
