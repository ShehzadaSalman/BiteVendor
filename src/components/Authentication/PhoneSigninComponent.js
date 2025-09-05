import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS, FONTS } from '../../constants';
import { FONT_SIZE } from '../../utils/spacing';
import AppButton from '../AppButton';
import FieldComponent from './FieldComponent';
import { useNavigation } from '@react-navigation/native';
export default function PhoneSigninComponent() {
  const [phone, setPhone] = useState();
  const navigation = useNavigation();
  const handleSendVerificationCodePress = () => {
    navigation.navigate('LoginScreen');
  };

  const handleLoginWithEmailPress = () => {
    navigation.navigate('LoginScreen');
  };
  return (
    <View style={styles.content}>
      <Text style={styles.title}>Log in with your phone number</Text>

      <FieldComponent
        label="phone"
        type="phone"
        value={phone}
        onChangeText={setPhone}
      />

      <AppButton
        title="Send verification code"
        style={{ marginVertical: 15 }}
        onPress={handleSendVerificationCodePress}
      />

      <View style={styles.divider}>
        <Image
          source={require('../../assets/images/Authentication/divider.png')}
          style={{ width: 150, marginRight: 15 }}
        />
        <Text style={styles.text}>or</Text>
        <Image
          source={require('../../assets/images/Authentication/divider.png')}
          style={{ width: 150, marginLeft: 15 }}
        />
      </View>

      <AppButton
        title="Log in with email"
        style={{ marginTop: 15 }}
        onPress={handleLoginWithEmailPress}
        backgroundColor={COLORS.white}
        textColor={COLORS.black}
      />

      <View style={{ marginTop: 15 }}>
        <Text style={styles.subText}>
          By continuing you acknowledge that your personal data
        </Text>
        <View style={styles.linkTextRow}>
          <Text style={styles.subText}>
            will be processed in accordance with the{' '}
          </Text>
          <Text style={styles.linkText}>Privacy Statement</Text>
        </View>
      </View>
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
    color: COLORS.text,
    marginBottom: 20,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  text: {
    fontFamily: FONTS.semiBold600,
    fontSize: FONT_SIZE.normal,
    fontWeight: '600',
    color: COLORS.grayText1,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  linkText: {
    fontFamily: FONTS.black900,
    color: COLORS.primary,
    fontSize: FONT_SIZE.normal,
    fontWeight: 'black',
    marginTop: 1,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  linkTextRow: {
    flexDirection: 'row',
    marginTop: 3,
  },
});
