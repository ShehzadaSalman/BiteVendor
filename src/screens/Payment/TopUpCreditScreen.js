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
import HeaderComponent from '../../components/HeaderComponent';
import TopUpComponent from '../../components/Payment/TopUpComponent';
import TopUpFooterComponent from '../../components/Payment/TopUpFooterComponent';
import { useNavigation } from '@react-navigation/native';

export default function TopUpCreditScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <HeaderComponent leftIcon="chevron" title="Top Up" />
      <View style={{ paddingHorizontal: 16 }}>
        <View style={styles.topUpRow}>
          <TopUpComponent title="+ Rs. 250" />
          <TopUpComponent title="+ Rs. 500" />
          <TopUpComponent title="+ Rs. 1,000" />
        </View>

        <Text style={styles.paymentMethodLabel}>Top-up amount</Text>
        <View style={styles.giftCreditBox}>
          <Text style={styles.paymentMethodText}>Rs.</Text>
          <Text style={styles.paymentMethodSubText} onPress={() => null}>
            200
          </Text>
        </View>
        <Text style={styles.paymentMethodMessgeText}>
          Enter an amount from Rs. 250.00 to Rs. 55,000.00
        </Text>

        <View style={styles.row}>
          <Image
            source={require('../../assets/images/Payment/paymentMethod.png')}
            style={styles.image}
          />
          <Text style={styles.label}>Payment methods</Text>
        </View>

        <TouchableOpacity
          style={[styles.row, { marginTop: 15 }]}
          onPress={() => navigation.navigate('PaymentMethodScreen')}
        >
          <Image
            source={require('../../assets/images/Payment/addPayment.png')}
            style={{ marginRight: 15 }}
          />
          <Text style={styles.paymentMethodText}>Add a payment method</Text>
        </TouchableOpacity>
      </View>
      <TopUpFooterComponent />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    padding: 20,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    textAlign: 'center',
  },
  topUpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  biteCreditText: {
    fontFamily: FONTS.medium500,
    fontSize: FONT_SIZE.medium,
    fontWeight: '500',
  },
  giftCreditSubText: {
    fontFamily: FONTS.black900,
    fontSize: FONT_SIZE.xlarge,
    fontWeight: 'black',
    color: COLORS.primary,
  },
  giftCreditBox: {
    flexDirection: 'row',
    padding: 6,
    borderRadius: BORDER_RADIUS.tiny,
    borderWidth: 1,
    borderColor: COLORS.gray,
    backgroundColor: COLORS.background,
    marginVertical: 3,
  },
  paymentMethodMessgeText: {
    fontFamily: FONTS.semiBold600,
    fontWeight: '600',
    fontSize: FONT_SIZE.small,
    color: COLORS.grayText1,
    marginLeft: 120,
  },
  paymentMethodText: {
    fontFamily: FONTS.medium500,
    fontWeight: '500',
    fontSize: FONT_SIZE.xSmall,
    color: COLORS.grayText1,
  },
  paymentMethodLabel: {
    fontFamily: FONTS.medium500,
    fontSize: FONT_SIZE.xSmall,
    color: COLORS.text,
  },
  paymentMethodSubText: {
    fontFamily: FONTS.bold700,
    fontWeight: 'bold',
    fontSize: FONT_SIZE.xSmall,
    color: COLORS.text,
  },
  label: {
    fontSize: FONT_SIZE.medium,
    fontFamily: FONTS.bold700,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  row: { flexDirection: 'row', marginTop: 40, alignItems: 'center' },
  image: { marginRight: 9 },
});
