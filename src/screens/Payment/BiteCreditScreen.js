import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { COLORS, FONTS } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BORDER_RADIUS, FONT_SIZE } from '../../utils/spacing';
import { useNavigation } from '@react-navigation/native';

export default function BiteCreditScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeAreaView} edges={['top']}>
      <ScrollView style={styles.container}>
        <View style={styles.bitCreditBox}>
          <View style={styles.bitCreditBoxRow}>
            <Text style={styles.biteCreditText}>Available credit</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('TopUpCreditScreen')}
              style={styles.imageContainer}
            >
              <Image
                source={require('../../assets/images/Payment/availableCredit.png')}
              />
            </TouchableOpacity>
          </View>

          <Text style={[styles.giftCreditSubText, styles.bold]}>RS. 0.00</Text>
        </View>

        <View style={[styles.giftCreditBox, styles.giftCreditBoxRow]}>
          <View style={{ flexDirection: 'row' }}>
            <View>
              <Image
                source={require('../../assets/images/Payment/giftBalance.png')}
                style={{ marginRight: 7, marginTop: 5 }}
              />
              <View />
            </View>
            <View>
              <Text
                style={[styles.biteCreditText, { color: COLORS.grayText1 }]}
              >
                Gift card balance
              </Text>

              <Text
                style={[
                  styles.giftCreditSubText,
                  styles.bold,
                  {
                    color: COLORS.text,
                  },
                ]}
              >
                RS. 0.00
              </Text>
            </View>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate('GiftCardScreen')}
            >
              <Image
                source={require('../../assets/images/Payment/right-chevron.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.row}>
          <Image
            source={require('../../assets/images/Payment/paymentMethod.png')}
            style={{ marginRight: 9 }}
          />
          <Text style={styles.label}>Payment methods</Text>
        </View>
        <View style={styles.giftCreditBox}>
          <Text style={styles.paymentMethodText}>
            Save a payment method at checkout to view it here
          </Text>
          <Text
            style={styles.paymentMethodSubText}
            onPress={() => navigation.goBack()}
          >
            Back to home
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: { flex: 1, backgroundColor: COLORS.primary },
  container: { padding: 20, backgroundColor: COLORS.background },
  bitCreditBox: {
    padding: 16,
    borderRadius: BORDER_RADIUS.tiny,
    borderWidth: 1,
    borderColor: COLORS.gray,
    backgroundColor: COLORS.primary,
  },
  bitCreditBoxRow: { flexDirection: 'row', justifyContent: 'space-between' },
  giftCreditBox: {
    padding: 16,
    borderRadius: BORDER_RADIUS.tiny,
    borderWidth: 1,
    borderColor: COLORS.gray,
    backgroundColor: COLORS.background,
    marginVertical: 16,
  },
  giftCreditBoxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  biteCreditText: {
    fontFamily: FONTS.medium500,
    fontWeight: '500',
    fontSize: FONT_SIZE.medium,
    color: COLORS.white,
  },
  giftCreditSubText: {
    fontFamily: FONTS.black900,
    fontWeight: 'black',
    fontSize: FONT_SIZE.xlarge,
    color: COLORS.white,
  },

  label: {
    fontSize: FONT_SIZE.normal,
    fontFamily: FONTS.bold700,
    fontWeight: 'bold',
    color: COLORS.text,
  },

  paymentMethodText: {
    fontFamily: FONTS.medium500,
    fontWeight: '500',
    fontSize: FONT_SIZE.xSmall,
    color: COLORS.grayText1,
  },
  paymentMethodSubText: {
    fontFamily: FONTS.bold700,
    fontWeight: 'bold',
    fontSize: FONT_SIZE.xSmall,
    color: COLORS.text,
  },
  imageContainer: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: { flexDirection: 'row', marginTop: 20, alignItems: 'center' },
  bold: {
    fontWeight: 'bold',
  },
});
