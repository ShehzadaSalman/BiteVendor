import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../constants';

const CustomToggle = ({ isActive, onToggle }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onToggle}
      style={[
        styles.toggleWrapper,
        isActive ? styles.wrapperActive : styles.wrapperInActive,
      ]}
    >
      {/* Thumb */}
      <View
        style={[
          styles.thumb,
          isActive ? styles.thumbActive : styles.thumbInactive,
        ]}
      />
    </TouchableOpacity>
  );
};

export default CustomToggle;

const styles = StyleSheet.create({
  toggleWrapper: {
    width: 40,
    height: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.primary,
    justifyContent: 'center',
  },
  wrapperActive: {
    backgroundColor: COLORS.primary,
  },
  wrapperInActive: {
    backgroundColor: COLORS.white,
  },
  thumb: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    top: 1,
  },
  thumbInactive: {
    left: 2,
    backgroundColor: COLORS.primary,
  },
  thumbActive: {
    right: 2,
    backgroundColor: COLORS.white,
  },
});
