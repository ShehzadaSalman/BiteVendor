import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { COLORS, FONTS } from '../../constants';
import { FONT_SIZE } from '../../utils/spacing';
import AppButton from '../../components/AppButton';
import { useNavigation } from '@react-navigation/native';
import VerifyEmailComponent from '../../components/Authentication/VerifyEmailComponent';

export default function VerifyEmailScreen() {
  const navigation = useNavigation();
  const [isEmailSent, setIsEmailSent] = useState(false);

  const sendEmailVerificationLink = () => {
    setIsEmailSent(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <VerifyEmailComponent isEmailSent={isEmailSent} />

      <View style={styles.buttonWrapper}>
        {isEmailSent ? (
          <>
            <AppButton
              title="Check inbox"
              onPress={() => navigation.goBack()} // update with correct screen
              style={{ marginBottom: 11 }}
            />
            <AppButton
              title="Resend verification link"
              onPress={sendEmailVerificationLink}
              backgroundColor={COLORS.white}
              textColor={COLORS.primary}
            />
          </>
        ) : (
          <AppButton
            title="Send verification email"
            onPress={sendEmailVerificationLink}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  buttonWrapper: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    backgroundColor: COLORS.background,
  },
});
