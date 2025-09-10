import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function CustomText({ children, style, ...props }) {
  return (
    <Text style={[styles.default, style]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  default: {
    fontFamily: 'Poppins-Regular',
  },
});
