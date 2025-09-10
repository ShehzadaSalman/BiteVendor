import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { FONT_SIZE } from '../utils/spacing';
import { FONTS } from '../constants';

export default function CustomTitle({
  children = 'Welcome to Bite',
  variant = 'title', // "title" | "subtitle"
  style,
  ...props
}) {
  return (
    <Text style={[styles[variant], style]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '600',
    fontSize: FONT_SIZE.large,
    fontFamily: FONTS.semiBold600,
    marginTop: 16,
  },
  subtitle: {
    fontWeight: '600',
    fontSize: FONT_SIZE.medium,
    fontFamily: FONTS.semiBold600,
    marginVertical: 12,
  },
});
