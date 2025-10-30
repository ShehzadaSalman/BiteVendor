import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '../../constants';
import { BORDER_RADIUS, FONT_SIZE } from '../../utils/spacing';
import AppButton from '../../components/AppButton';
import { isIOS, SCREEN_WIDTH } from '../../utils/layout';
import HeaderComponent from '../../components/HeaderComponent';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Alert } from 'react-native';
import { useVendor } from '../../services/VendorProvider';

export default function EditMobileScreen() {
  const navigation = useNavigation();
  const { vendor, updateProfile } = useVendor();
  const [mobile, setMobile] = useState(vendor?.phone || vendor?.alternate_phone || '');
  const insets = useSafeAreaInsets();

  const onSave = async () => {
    const digits = String(mobile || '').replace(/\D+/g, '');
    if (!digits) {
      Alert.alert('Mobile required', 'Please enter your mobile number.');
      return;
    }
    // Prepend +92 if user omitted country code
    const formatted = digits.startsWith('92') ? `+${digits}` : `+92${digits}`;
    try {
      await updateProfile({ phone: formatted });
      Alert.alert('Saved', 'Your mobile number has been updated.');
      navigation.goBack();
    } catch (e) {
      Alert.alert('Update failed', e?.message || 'Please try again.');
    }
  };
  return (
    <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top }]}>
      <HeaderComponent
        title="Mobile Number"
        leftIcon="chevron"
        rightIcon={require('../../assets/images/user/tick.png')}
        onRightPress={onSave}
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={isIOS ? 'padding' : undefined}
        keyboardVerticalOffset={isIOS ? 100 : 0}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.sectionTitle}>Change your number</Text>
          <View style={styles.containerRow}>
            <View style={styles.row}>
              <Image
                source={require('../../assets/images/user/flag.png')}
                style={styles.image}
              />
              <Text>+92</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="300-*******"
              value={mobile}
              onChangeText={setMobile}
            />
          </View>
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
  containerRow: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  row: {
    height: 39,
    width: 75,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: COLORS.gray,
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.small,
    paddingHorizontal: 5,
    marginRight: 5,
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

  input: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: BORDER_RADIUS.xlarge,
    padding: 10,
    marginBottom: 16,
    width: SCREEN_WIDTH - 120,
  },
  buttonWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: COLORS.background,
  },
  image: { width: 25, height: 25, marginRight: 9 },
});
