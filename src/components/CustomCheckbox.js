// components/CustomCheckbox.tsx
import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { COLORS } from '../constants';

export default function CustomCheckbox({
  value,
  onChange,
  checkedColor = false,

  boxStyle = {
    width: 12,
    height: 12,
    borderRadius: 1,
  },
  checked = {
    width: 8,
    height: 8,
    borderRadius: 2,
  },
}) {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: value ? 1 : 0,
      useNativeDriver: true,
      speed: 20,
    }).start();
  }, [value, scaleAnim]);

  return (
    <TouchableOpacity
      onPress={() => onChange(!value)}
      style={[
        styles.box,
        {
          borderColor: checkedColor ? COLORS.white : COLORS.borderGray,
        },
        boxStyle,
      ]}
    >
      <Animated.View
        style={[
          checked,
          { backgroundColor: checkedColor ? COLORS.white : COLORS.primary },
          {
            transform: [{ scale: scaleAnim }],
            opacity: scaleAnim,
          },
        ]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
