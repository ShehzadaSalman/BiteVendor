import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { COLORS, FONTS } from '../../constants';
import { BORDER_RADIUS, FONT_SIZE } from '../../utils/spacing';
import AppButton from '../AppButton';
export default function SignUpOrSigninComponent({
  goToNext,
  isScreen = false,
}) {
  const handleEmailPress = () => {
    if (!isScreen) {
      goToNext(1);
    } else {
      goToNext();
    }
  };
  const titleText = isScreen ? 'Sign up or log in' : 'Welcome!';
  return (
    <View style={styles.content}>
      <Text style={styles.title}>{titleText}</Text>
      <Text style={styles.subText}>Signup or login to continue</Text>

      <TouchableOpacity style={styles.fbButton}>
        <Image
          source={require('../../assets/images/Authentication/fb.png')}
          style={{ marginRight: 60 }}
        />
        <Text style={styles.fbText}>Continue with Facebook</Text>
      </TouchableOpacity>
      {isScreen && (
        <TouchableOpacity style={styles.googleButton}>
          <Image
            source={require('../../assets/images/Authentication/google.png')}
            style={{ marginRight: 75 }}
          />
          <Text style={styles.googleText}>Continue with Google</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.appleButton}>
        <Image
          source={require('../../assets/images/Authentication/apple.png')}
          style={{ marginRight: 80 }}
        />
        <Text style={styles.appleText}>Continue with Apple</Text>
      </TouchableOpacity>

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
      {isScreen ? (
        <AppButton
          title="Continue with email"
          style={{ marginBottom: 10 }}
          onPress={handleEmailPress}
        />
      ) : (
        <>
          <AppButton
            title="Log In"
            style={{ marginBottom: 10 }}
            onPress={handleEmailPress}
          />

          <AppButton
            title="Sign Up"
            backgroundColor={COLORS.background}
            textColor={COLORS.primary}
          />
        </>
      )}
      <View
        style={{ marginTop: isScreen ? -10 : 0, justifyContent: 'flex-end' }}
      >
        <View style={[styles.linkTextRow, {}]}>
          <Text style={styles.subText}> By signing up, you agree to our </Text>
          <Text style={[styles.linkText, { marginTop: -3 }]}>
            Terms and Conditions
          </Text>
        </View>
      </View>
      <View style={{ marginTop: -10, justifyContent: 'flex-start' }}>
        <View style={styles.linkTextRow}>
          <Text style={styles.subText}> and </Text>
          <Text style={[styles.linkText, { marginTop: -3 }]}>
            {' '}
            Privacy Policy
          </Text>
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
    marginBottom: 2,
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
  subText: {
    fontFamily: FONTS.medium500,
    fontSize: FONT_SIZE.normal,
    fontWeight: '500',
    color: COLORS.grayText1,
    marginBottom: 8,
    marginTop: 4,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },

  fbButton: {
    flexDirection: 'row',
    backgroundColor: '#1878F3',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: BORDER_RADIUS.normal,
    alignItems: 'center',
    marginVertical: 6,
  },
  fbText: {
    fontFamily: FONTS.bold700,
    fontSize: FONT_SIZE.normal,
    color: COLORS.white,
    fontWeight: '700',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  appleButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.black,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: BORDER_RADIUS.normal,
    alignItems: 'center',
    marginVertical: 4,
  },
  appleText: {
    fontFamily: FONTS.bold700,
    fontSize: FONT_SIZE.normal,
    fontWeight: '700',
    color: COLORS.white,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  googleButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: BORDER_RADIUS.normal,
    borderWidth: 1,
    borderColor: COLORS.black,
    alignItems: 'center',
    marginVertical: 6,
  },
  googleText: {
    fontFamily: FONTS.bold700,
    fontSize: FONT_SIZE.normal,
    fontWeight: '700',
    color: COLORS.text,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  linkText: {
    fontFamily: FONTS.semiBold600,
    color: COLORS.primary,
    fontSize: FONT_SIZE.normal,
    fontWeight: '600',
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  linkTextRow: {
    flexDirection: 'row',
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
