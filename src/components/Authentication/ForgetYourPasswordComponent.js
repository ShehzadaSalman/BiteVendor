import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';
import IsHeaderComponentShow from './IsHeaderComponentShow';
import AppButton from '../AppButton';
import { BORDER_RADIUS, FONT_SIZE } from '../../utils/spacing';
import { COLORS, FONTS } from '../../constants';
import { useNavigation } from '@react-navigation/native';

export default function ForgetYourPasswordComponent({
  goToNext,
  onClose,
  isScreen = false,
}) {
  const navigation = useNavigation();
  const imageSource = isScreen
    ? require('../../assets/images/Authentication/forgetPasswordBig.png')
    : require('../../assets/images/Authentication/forgetPassword.png');

  const handleResetPasswordPress = () => {
    if (!isScreen) {
      goToNext(4);
    } else {
      goToNext();
    }
  };

  const handleBackToLoginPress = () => {
    if (!isScreen) {
      goToNext(0);
    } else {
      navigation.navigate('SignUpOrLoginScreen');
    }
  };

  return (
    <View style={styles.content}>
      <IsHeaderComponentShow
        goToStep={goToNext}
        onClose={onClose}
        isScreen={isScreen}
        gotoBack={2}
      />
      <View style={{ alignItems: isScreen ? 'center' : 'flex-start' }}>
        <Image source={imageSource} style={{ marginVertical: 15 }} />
      </View>
      <Text style={[styles.title, isScreen && { textAlign: 'center' }]}>
        Forget your password?
      </Text>
      <Text
        style={[
          styles.subText,
          isScreen && { textAlign: 'center', paddingHorizontal: 30 },
        ]}
      >
        `Enter your email and we’ll send you a link to reset your password`
      </Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        placeholderTextColor={COLORS.grayText1}
      />

      <AppButton
        title="Reset Password"
        style={{ marginVertical: 10 }}
        onPress={handleResetPasswordPress}
      />

      <TouchableOpacity onPress={handleBackToLoginPress}>
        <Text style={styles.linkText}>Back to login</Text>
      </TouchableOpacity>
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
  input: {
    borderWidth: 1,
    borderColor: COLORS.grayText1,
    borderRadius: BORDER_RADIUS.medium,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 5,
    marginTop: 10,
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
