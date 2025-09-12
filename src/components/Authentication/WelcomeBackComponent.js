import React, { useState } from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import IsHeaderComponentShow from './IsHeaderComponentShow';
import AppButton from '../AppButton';
import { FONT_SIZE } from '../../utils/spacing';
import { COLORS, FONTS } from '../../constants';
import { CommonActions, useNavigation } from '@react-navigation/native';
import PasswordField from './PasswordField';

export default function WelcomeBackComponent({
  goToNext,
  onClose,
  isScreen = false,
}) {
  const navigation = useNavigation();
  const [password, setPassword] = useState();
  const title = isScreen ? 'Log in with your email' : ' Welcome back!';
  // const resetToHome = () => {
  //   navigation.dispatch(
  //     CommonActions.reset({
  //       index: 0,
  //       routes: [{ name: 'Home' }],
  //     }),
  //   );
  // };
  const handleLoginWithPasswordPress = () => {
    if (!isScreen) {
      goToNext(3);
    } else {
      goToNext();
    }
  };

  const handleForgotYourPasswordPress = () => {
    if (!isScreen) {
      goToNext(3);
    } else {
      navigation.navigate('ForgetYourPasswordScreen');
    }
  };

  const handleSendLoginLinkPress = () => {
    if (!isScreen) {
      goToNext(4);
    } else {
      navigation.navigate('MessageVerifyEmailScreen');
    }
  };

  const imageSource = isScreen
    ? require('../../assets/images/Authentication/loginWIthEmail.png')
    : require('../../assets/images/Authentication/welcomeBack.png');
  return (
    <View style={styles.content}>
      <IsHeaderComponentShow
        goToStep={goToNext}
        onClose={onClose}
        isScreen={isScreen}
        gotoBack={1}
      />
      <View style={{ alignItems: isScreen ? 'center' : 'flex-start' }}>
        <Image source={imageSource} style={{ marginVertical: 15 }} />
      </View>

      <Text style={[styles.title, isScreen && { textAlign: 'center' }]}>
        {title}
      </Text>
      <Text
        style={[
          styles.subText,
          isScreen && { textAlign: 'center', paddingHorizontal: 50 },
        ]}
      >
        Login by typing your password. We can also send a login link to your
        email.
      </Text>

      <PasswordField
        value={password}
        onChangeText={setPassword}
        label="Password"
      />

      <TouchableOpacity onPress={handleForgotYourPasswordPress}>
        <Text style={styles.linkText}>Forgot your password?</Text>
      </TouchableOpacity>

      <AppButton
        title="Login with password"
        style={{ marginBottom: 10 }}
        onPress={handleLoginWithPasswordPress}
      />

      <AppButton
        title="Send me a login link"
        backgroundColor={COLORS.background}
        textColor={COLORS.black}
        onPress={handleSendLoginLinkPress}
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
    marginBottom: 25,
  },
});
