import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { COLORS, FONTS } from '../constants';
import { BORDER_RADIUS, FONT_SIZE } from '../utils/spacing';

const AppButton = ({
  title,
  onPress,
  backgroundColor,
  textColor,
  style,
  textStyle,
  image = null,
}) => {
  const background = backgroundColor ? backgroundColor : COLORS.primary;
  const color = textColor ? textColor : COLORS.white;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: background, borderColor: color },
        style,
        image ? styles.row : {},
      ]}
      onPress={onPress}
    >
      {image && <Image source={image} style={{ marginRight: 10 }} />}
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AppButton;
