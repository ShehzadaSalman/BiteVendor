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

export default function EditNameScreen() {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top }]}>
      <HeaderComponent
        title="Name"
        bottomBorder={true}
        leftIcon="chevron"
        rightIcon={require('../../assets/images/user/tick.png')}
        onRightPress={() => console.log('Saved')}
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={isIOS ? 'padding' : undefined}
        keyboardVerticalOffset={isIOS ? 100 : 0}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.sectionTitle}>Personal Details</Text>

          <Text style={styles.label}>First name</Text>
          <TextInput
            style={styles.input}
            placeholder="Name of Person"
            value={firstName}
            onChangeText={setFirstName}
          />

          <Text style={styles.label}>Last name</Text>
          <TextInput
            style={styles.input}
            placeholder="Last name"
            value={lastName}
            onChangeText={setLastName}
          />
        </ScrollView>

        <View style={styles.buttonWrapper}>
          <AppButton title="Save" onPress={() => navigation.goBack()} />
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
