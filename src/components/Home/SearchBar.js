import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BORDER_RADIUS, FONT_SIZE } from '../../utils/spacing';
import { COLORS, FONTS } from '../../constants';
import { isAndroid } from '../../utils/layout';

const SearchBar = ({ searchBg, placeholder }) => {
  return (
    <View style={[styles.container, { backgroundColor: searchBg }]}>
      <Ionicons name="search" size={18} color="#555" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center', // ensures children are aligned
    borderRadius: BORDER_RADIUS.tiny,
    paddingHorizontal: 12,
    height: 35,
  },
  icon: {
    marginRight: 2,
    color: '#555',
    // Fix: vertically center icon better
    marginTop: isAndroid ? -3 : 0,
  },
  input: {
    flex: 1,
    fontFamily: FONTS.Light300,
    fontSize: FONT_SIZE.normal,
    color: COLORS.grayText,
    fontWeight: '300',
    includeFontPadding: false, // removes Android extra space
    textAlignVertical: 'center', // vertical center text
    paddingVertical: 0, // remove vertical padding
  },
});

export default SearchBar;
