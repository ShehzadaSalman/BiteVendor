import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FONTS, COLORS } from '../constants';
import { FONT_SIZE } from '../utils/spacing';

export default function HeaderComponent({
  title,
  subtitle,
  bottomBorder = false,
  leftIcon = 'cross', // 'cross' or 'chevron'
  onleftPress = null,
  rightIcon, // optional: require('../../assets/icons/tick.png') etc.
  onRightPress = null, // optional: function
  isCircle = true,
}) {
  const navigation = useNavigation();
  const leftPress = onleftPress ? onleftPress : () => navigation.goBack();
  const getLeftIconSource = () => {
    return leftIcon === 'chevron'
      ? require('../assets/images/Header/left-chevron.png')
      : require('../assets/images/Header/notification.png');
  };

  return (
    <View style={[styles.container, bottomBorder ? styles.bottomBorder : {}]}>
      <TouchableOpacity
        style={[styles.leftIcon, isCircle ? styles.circle : {}]}
        onPress={leftPress}
      >
        <Image source={getLeftIconSource()} />
      </TouchableOpacity>

      <Text style={styles.heading}>{title}</Text>

      {rightIcon && (
        <TouchableOpacity
          style={[styles.rightIcon, isCircle ? styles.circle : {}]}
          onPress={onRightPress}
        >
          <Image source={rightIcon} />
        </TouchableOpacity>
      )}

      {subtitle && <Text style={styles.subHeading}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
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
  heading: {
    fontFamily: FONTS.bold700,
    fontSize: FONT_SIZE.medium,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subHeading: {
    fontFamily: FONTS.medium500,
    fontSize: FONT_SIZE.normal,
    fontWeight: '500',
    alignSelf: 'center',
    color: COLORS.grayText1,
    marginTop: 4,
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
