import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../../constants';
import { BORDER_RADIUS, FONT_SIZE, rh, rw } from '../../utils/spacing';
import { FilterChartContext } from '../../services/FilterChartProvider';

const FILTERS = ['Today', '7 days', '30 days', 'All'];

export default function HorizontalFilters() {
  const { selected, setSelected } = useContext(FilterChartContext);

  return (
    <View style={styles.filterRow}>
      {FILTERS.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.filterBtn,
              selected === item && styles.filterBtnActive,
            ]}
            onPress={() => setSelected(item)}
          >
            <Text
              style={[
                styles.filterText,
                selected === item && styles.filterTextActive,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  filterRow: {
    flexDirection: 'row',
    margin: 4,
    justifyContent: 'space-between',
  },
  filterBtn: {
    paddingVertical: rh(0.6),
    paddingHorizontal: rw(4),
    borderRadius: BORDER_RADIUS.large,
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    backgroundColor: COLORS.white,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  filterBtnActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  filterTextActive: {
    color: COLORS.white,
    fontFamily: FONTS.semiBold600,
    fontWeight: '600',
    fontSize: FONT_SIZE.xSmall,
  },

  filterText: {
    fontFamily: FONTS.semiBold600,
    fontWeight: '600',
    fontSize: FONT_SIZE.xSmall,
    color: COLORS.text,
  },
});
