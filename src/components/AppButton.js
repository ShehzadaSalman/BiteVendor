import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../constants';
import { BORDER_RADIUS, FONT_SIZE } from '../utils/spacing';

const AppButton = ({
  title,
  onPress,
  backgroundColor,
  textColor,
  style,
  textStyle,
}) => {
  const background = backgroundColor ? backgroundColor : COLORS.primary;
  const color = textColor ? textColor : COLORS.white;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: background, borderColor: color },
        style,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: color }, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: BORDER_RADIUS.xlarge,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  buttonText: {
    fontFamily: FONTS.bold700,
    fontSize: FONT_SIZE.medium,
    fontWeight: 'bold',
  },
});

export default AppButton;
