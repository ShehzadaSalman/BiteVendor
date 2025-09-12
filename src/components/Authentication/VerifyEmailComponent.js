import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { BORDER_RADIUS, FONT_SIZE } from '../../utils/spacing';
import { COLORS, FONTS } from '../../constants';
export default function VerifyEmailComponent({ isEmailSent }) {
  return (
    <View style={styles.contentWrapper}>
      <Image
        source={require('../../assets/images/user/mail.png')}
        style={{ marginBottom: 20 }}
      />
      {isEmailSent ? (
        <>
          <Text style={styles.sectionTitle}>
            We’ve sent a verification link to
          </Text>
          <Text style={styles.sectionTitle}>name@gmail.com</Text>
          <Text style={styles.sectionSubTitle}>
            Please click the verification link in your inbox
          </Text>
        </>
      ) : (
        <Text style={styles.sectionTitle}>
          Verify your email address to get started
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: FONTS.bold700,
    fontSize: FONT_SIZE.medium,
    color: COLORS.text,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sectionSubTitle: {
    fontFamily: FONTS.medium500,
    fontSize: FONT_SIZE.xSmall,
    color: COLORS.grayText1,
    fontWeight: '500',
    marginTop: 9,
    textAlign: 'center',
  },
});
