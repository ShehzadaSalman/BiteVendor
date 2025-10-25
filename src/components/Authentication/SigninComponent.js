import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { COLORS, FONTS } from '../../constants';
import { FONT_SIZE } from '../../utils/spacing';
import AppButton from '../AppButton';
import FieldComponent from './FieldComponent';
import { signIn } from '../../redux/slices/authSlice';
import axios from 'axios';

export default function SigninComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: '',
  });
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handlePhonePress = () => {
    navigation.navigate('PhoneLoginScreen');
  };

  const validate = () => {
    const nextErrors = { email: '', password: '', general: '' };
    const trimmedEmail = (email || '').trim();
    const trimmedPassword = (password || '').trim();
    if (!trimmedEmail) {
      nextErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail)) {
        nextErrors.email = 'Enter a valid email address';
      }
    }
    if (!trimmedPassword) {
      nextErrors.password = 'Password is required';
    } else if (trimmedPassword.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(nextErrors);
    return !nextErrors.email && !nextErrors.password;
  };

  const handleLoginPress = async () => {
    if (loading) return;
    setErrors({ email: '', password: '', general: '' });
    if (!validate()) return;
    try {
      setLoading(true);
      const response = await axios.post(
        'https://development.bite.com.pk/api/vendor/login',
        { email, password },
        { timeout: 15000 },
      );
      const data = response?.data;
      if (data?.status) {
        const token = data.token;
        const vendor = data.vendor;
        // Set default Authorization header for subsequent requests
        if (token) {
          axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        }
        dispatch(signIn({ token, vendor }));
      } else {
        setErrors(prev => ({
          ...prev,
          general: data?.message || 'Login failed',
        }));
      }
    } catch (err) {
      setErrors(prev => ({
        ...prev,
        general: 'Unable to login. Please try again.',
      }));
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.content}>
      <Text style={styles.title}>Log in with your email</Text>

      <FieldComponent
        label="Email"
        type="email"
        value={email}
        onChangeText={setEmail}
      />
      {!!errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <FieldComponent
        label="Password"
        type="password"
        value={password}
        onChangeText={setPassword}
      />
      {!!errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}

      {!!errors.general && (
        <Text style={[styles.errorText, { textAlign: 'center' }]}>
          {errors.general}
        </Text>
      )}

      <AppButton
        title={loading ? 'Logging in…' : 'Log In'}
        style={{ marginVertical: 15 }}
        onPress={handleLoginPress}
      />

      {/**
       * Divider and Phone login temporarily disabled per requirement
       *
       * <View style={styles.divider}>
       *   <Image
       *     source={require('../../assets/images/Authentication/divider.png')}
       *     style={{ width: 150, marginRight: 15 }}
       *   />
       *   <Text style={styles.text}>or</Text>
       *   <Image
       *     source={require('../../assets/images/Authentication/divider.png')}
       *     style={{ width: 150, marginLeft: 15 }}
       *   />
       * </View>
       *
       * <AppButton
       *   title="Log in with phone number"
       *   style={{ marginTop: 15 }}
       *   onPress={handlePhonePress}
       *   backgroundColor={COLORS.white}
       *   textColor={COLORS.black}
       * />
       */}

      <View style={{ marginTop: 15 }}>
        <Text style={styles.subText}>
          By continuing you acknowledge that your personal data will
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
  errorText: {
    color: 'red',
    fontSize: FONT_SIZE.small,
    fontFamily: FONTS.medium500,
    marginTop: -15,
    marginBottom: 10,
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
