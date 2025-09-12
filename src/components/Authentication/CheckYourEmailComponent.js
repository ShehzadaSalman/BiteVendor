import React from 'react';
import { View, Text, StyleSheet, TextInput, Image } from 'react-native';
import HeaderComponent from '../HeaderComponent';
import AppButton from '../AppButton';
import { FONT_SIZE } from '../../utils/spacing';
import { COLORS, FONTS } from '../../constants';

export default function CheckYourEmailComponent({ goToNext, onClose }) {
  return (
    <View style={styles.content}>
      <HeaderComponent
        title=""
        leftIcon="chevron"
        bottomBorder={false}
        onleftPress={() => goToNext(3)}
        rightIcon={require('../../assets/images/Authentication/Cross1.png')}
        onRightPress={onClose}
      />
      <Image
        source={require('../../assets/images/Authentication/checkEmail.png')}
        style={{ marginVertical: 15 }}
      />
      <Text style={styles.title}>Check your email</Text>
      <Text style={styles.subText}>
        We sent you an email with instructions to reset your password. Don’t
        forget to look in your spam folder
      </Text>

      {/* <TextInput
        placeholder="Email"
        style={styles.input}
        placeholderTextColor={COLORS.grayText1}
      /> */}

      <AppButton
        title="Back to login"
        style={{ marginVertical: 10 }}
        onPress={() => goToNext(0)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    marginTop: 10,

    paddingBottom: 20,
  },
  title: {
    fontFamily: FONTS.bold700,
    fontSize: FONT_SIZE.xlarge,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  subText: {
    fontFamily: FONTS.medium500,
    fontSize: FONT_SIZE.xSmall,
    fontWeight: '500',
    color: COLORS.grayText1,
    marginVertical: 8,
  },
  linkText: {
    fontFamily: FONTS.bold700,
    color: COLORS.text,
    fontSize: FONT_SIZE.small,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 11,
  },
});
