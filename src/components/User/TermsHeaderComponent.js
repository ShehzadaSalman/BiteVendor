import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { COLORS, FONTS } from '../../constants';
import { FONT_SIZE } from '../../utils/spacing';
import HeaderComponent from '../HeaderComponent';
export default function TermsHeaderComponent({ onPress, title }) {
  return (
    <View style={styles.container}>
      <HeaderComponent
        title={title}
        leftIcon="chevron"
        rightIcon={require('../../assets/images/user/login.png')}
        onRightPress={onPress}
      />

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/user/LogoBite.png')} // replace with your logo
          style={styles.logo}
        />
      </View>

      {/* Banner Image */}
      <Image
        source={require('../../assets/images/user/terms_banner.png')} // replace with your banner
        style={styles.banner}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: COLORS.background,
  },

  logoContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  logo: {
    width: 70,
    height: 37,
    resizeMode: 'contain',
  },
  banner: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },
});
