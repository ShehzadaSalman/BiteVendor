import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS, FONTS } from '../../constants';
import { BORDER_RADIUS, FONT_SIZE } from '../../utils/spacing';
import AppButton from '../../components/AppButton';
import { isIOS } from '../../utils/layout';
import HeaderComponent from '../../components/HeaderComponent';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Alert } from 'react-native';
import { useVendor } from '../../services/VendorProvider';

export default function EditEmailScreen() {
  const navigation = useNavigation();
  const { vendor, updateProfile } = useVendor();
  const [email, setEmail] = useState(vendor?.email || '');
  const insets = useSafeAreaInsets();

  const onSave = async () => {
    const trimmed = String(email || '').trim();
    if (!trimmed) {
      Alert.alert('Email required', 'Please enter your email.');
      return;
    }
    try {
      await updateProfile({ email: trimmed });
      Alert.alert('Saved', 'Your email has been updated.');
      navigation.goBack();
    } catch (e) {
      Alert.alert('Update failed', e?.message || 'Please try again.');
    }
  };
  return (
    <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top }]}>
      <HeaderComponent
        title="Email"
        leftIcon="chevron"
        bottomBorder={true}
        rightIcon={require('../../assets/images/user/tick.png')}
        onRightPress={onSave}
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={isIOS ? 'padding' : undefined}
        keyboardVerticalOffset={isIOS ? 100 : 0}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.sectionTitle}>Change your email</Text>

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
        </ScrollView>

        <View style={styles.buttonWrapper}>
          <AppButton title="Save" onPress={onSave} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100, // space for button
  },
  sectionTitle: {
    fontFamily: FONTS.bold700,
    fontSize: FONT_SIZE.medium,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: FONT_SIZE.normal,
    color: COLORS.text,
    fontFamily: FONTS.semiBold600,
    fontWeight: '600',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: BORDER_RADIUS.xlarge,
    padding: 10,
    marginBottom: 16,
  },
  buttonWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: COLORS.background,
  },
});
