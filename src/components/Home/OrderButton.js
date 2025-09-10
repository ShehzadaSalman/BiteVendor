import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../../constants';
import { BORDER_RADIUS, FONT_SIZE } from '../../utils/spacing';

export default function OrderButton({ icon, label, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.square}>
        <Image source={icon} style={styles.icon} />
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginHorizontal: 5 },

  square: {
    width: 120, // ✅ fixed width
    height: 90, // ✅ fixed height
    backgroundColor: COLORS.lightGray,
    borderRadius: BORDER_RADIUS.small,
    borderColor: COLORS.secondary,
    borderWidth: 1,
    //elevation: 0.1,
    //shadowOpacity: 0.1,
    alignItems: 'center', // ✅ center icon horizontally
    justifyContent: 'center', // ✅ center icon vertically
    marginBottom: 2,
  },
  icon: {
    // width: 70,
    // height: 60,
    //resizeMode: 'contain', // ✅ prevents stretching
  },

  label: {
    fontFamily: FONTS.extrabold800,
    fontSize: FONT_SIZE.xSmall,
    color: COLORS.text,
    fontWeight: '800',
  },
});
