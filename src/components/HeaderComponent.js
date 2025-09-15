import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FONTS, COLORS } from '../constants';
import { FONT_SIZE } from '../utils/spacing';

export default function HeaderComponent({
  title,
  subtitle,
  bottomBorder = false,
  leftIcon = 'cross', // 'cross' | 'chevron'
  onLeftPress = null,
  rightIcon, // require(...) | null
  onRightPress = null,
  isCircle = false, // ✅ toggle circle icons
  withSubtitle = false, // ✅ toggle stacked layout
}) {
  const navigation = useNavigation();
  const leftPress = onLeftPress || (() => navigation.goBack());

  // Select left icon
  const getLeftIconSource = () => {
    const isBlackIcon = isCircle
      ? require('../assets/images/Header/left-chevron.png')
      : require('../assets/images/Header/back.png');

    return leftIcon === 'chevron'
      ? isBlackIcon
      : require('../assets/images/Header/cross.png');
  };

  return (
    <View style={[styles.container, bottomBorder && styles.bottomBorder]}>
      {/* Left Icon */}
      <TouchableOpacity
        style={[styles.leftIcon, isCircle && styles.circle]}
        onPress={leftPress}
      >
        <Image source={getLeftIconSource()} />
      </TouchableOpacity>

      {/* Title + Subtitle (stacked if withSubtitle = true) */}
      <View style={styles.center}>
        <Text style={styles.heading}>{title}</Text>
        {withSubtitle && subtitle && (
          <Text style={styles.subHeading}>{subtitle}</Text>
        )}
      </View>

      {/* Right Icon */}
      {rightIcon && (
        <TouchableOpacity
          style={[styles.rightIcon, isCircle && styles.circle]}
          onPress={onRightPress}
        >
          <Image source={rightIcon} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    minHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  bottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
  leftIcon: {
    position: 'absolute',
    left: 0,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  rightIcon: {
    position: 'absolute',
    right: 0,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontFamily: FONTS.bold700,
    fontSize: FONT_SIZE.medium,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subHeading: {
    fontFamily: FONTS.medium500,
    fontSize: FONT_SIZE.small,
    fontWeight: '500',
    color: COLORS.grayText1,
    marginTop: 2,
  },
  circle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
