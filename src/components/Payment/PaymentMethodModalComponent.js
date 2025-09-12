import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../constants'; // Adjust this path if needed
import AppButton from '../AppButton';
import { FONT_SIZE } from '../../utils/spacing';
export default function PaymentMethodModalComponent({ title, onClose }) {
  const [saveCard, setSaveCard] = React.useState(false);
  const handleSubmit = () => {
    onClose();
  };

  return (
    <View style={styles.sheetContainer}>
      <Text style={styles.title}>Pay with {title}</Text>
      <Text style={styles.subtitle}>
        Enter your {title} account details to proceed. Please ensure that you
        have enough balance in your wallet.
      </Text>
      <Text style={styles.cardHolderLable}>Name</Text>
      <TextInput style={styles.input} />

      <Text style={styles.cardHolderLable}>Mobile Number</Text>
      <TextInput style={styles.input} />

      <Text style={styles.cardHolderLable}>CNIC (Last 6 digits)</Text>
      <TextInput style={styles.input} />

      <AppButton
        title="Done"
        style={{ marginTop: 50 }}
        onPress={handleSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sheetContainer: {
    paddingVertical: 20,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  title: {
    fontFamily: FONTS.semiBold600,
    fontSize: FONT_SIZE.large,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: FONTS.medium500,
    fontSize: FONT_SIZE.xSmall,
    fontWeight: '500',
    color: COLORS.grayText,
    marginTop: 5,
    marginBottom: 16,
    textAlign: 'center',
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

  cardHolderLable: {
    fontFamily: FONTS.medium500,
    fontSize: FONT_SIZE.small,
    color: COLORS.grayText1,
    fontWeight: '500',
  },
});
