import React from 'react';
import { View, Text, TextInput, StyleSheet, Linking } from 'react-native';
import { COLORS, FONTS } from '../../constants'; // Adjust this path if needed
import HeaderComponent from '../../components/HeaderComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomCheckbox from '../../components/CustomCheckbox';
import AppButton from '../../components/AppButton';
import { FONT_SIZE } from '../../utils/spacing';
export default function AddCreditDebitCardScreen() {
  const [saveCard, setSaveCard] = React.useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent title="Select a payment method" bottomBorder={false} />
      <Text style={styles.subtitle}>Add a credit or debit card</Text>

      {/* Input fields */}
      <TextInput
        placeholder="Card number"
        style={styles.input}
        placeholderTextColor={COLORS.grayText1}
      />

      <View style={styles.row}>
        <TextInput
          placeholder="MM/YY"
          style={[styles.input, styles.halfInput]}
          placeholderTextColor={COLORS.grayText1}
        />
        <TextInput
          placeholder="CVC"
          style={[styles.input, styles.halfInput]}
          placeholderTextColor={COLORS.grayText1}
        />
      </View>
      <Text style={styles.cardHolderLable}>Name of card holder</Text>
      <TextInput style={styles.input} />

      {/* Checkbox */}
      <View style={styles.checkboxRow}>
        <CustomCheckbox value={saveCard} onChange={setSaveCard} />
        <Text style={styles.checkboxText}>
          Save this card for a faster checkout next time
        </Text>
      </View>

      {/* Info Text */}
      <Text style={styles.infoText}>
        By saving your card you grant us your consent to store your payment
        method for future orders
      </Text>
      <Text style={styles.infoText}>
        For more information, please visit the{' '}
        <Text
          style={styles.linkText}
          onPress={() => Linking.openURL('https://your-privacy-policy.com')}
        >
          Privacy policy
        </Text>
      </Text>
      <AppButton title="Done" style={{ marginTop: 50 }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.white,
  },

  subtitle: {
    fontFamily: FONTS.semiBold600,
    fontSize: FONT_SIZE.medium,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 42,
    marginBottom: 16,
  },
  input: {
    fontFamily: FONTS.medium500,
    fontSize: FONT_SIZE.xSmall,
    fontWeight: '500',
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.grayText,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 7,
  },
  checkboxText: {
    fontFamily: FONTS.semiBold600,
    fontSize: FONT_SIZE.small,
    fontWeight: '600',
    color: COLORS.grayText1,
    marginLeft: 6,
    flex: 1,
  },
  infoText: {
    fontFamily: FONTS.medium500,
    fontSize: FONT_SIZE.small,
    fontWeight: '500',
    color: COLORS.grayText,
    marginBottom: 2,
    marginLeft: 15,
  },
  linkText: {
    fontFamily: FONTS.semiBold600,
    fontSize: FONT_SIZE.small,
    color: COLORS.primary,
    fontWeight: '600',
  },

  cardHolderLable: {
    fontFamily: FONTS.medium500,
    fontSize: FONT_SIZE.small,
    color: COLORS.grayText1,
    fontWeight: '500',
  },
});
