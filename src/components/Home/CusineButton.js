import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../../constants';
import { FONT_SIZE } from '../../utils/spacing';

export default function CusineButton({ icon, label, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.circle}>
        <Image source={icon} style={styles.icon} />
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginHorizontal: 3 },
  circle: {
    width: 62,
    height: 62,
    backgroundColor: COLORS.lightGreen,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 31,
    marginBottom: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    //width: 24, height: 24
  },
  label: {
    fontFamily: FONTS.extrabold800,
    fontSize: FONT_SIZE.tiny,
    fontWeight: '800',
    color: COLORS.text,
  },
});
