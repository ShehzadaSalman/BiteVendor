import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../../constants';
import { BORDER_RADIUS, FONT_SIZE, rh, rw, SPACING } from '../../utils/spacing';
import InfoBadge from '../InfoBadge';

export default function RestaurantCard({
  image,
  name,
  subTitle,
  time,
  type,
  onPress,
}) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={image} style={styles.image} resizeMode="cover" />
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.subtext}>{subTitle}</Text>
      </View>
      <View style={styles.row}>
        <InfoBadge
          image={require('../../assets/images/Home/Featured/time.png')}
          time={time}
        />
        <InfoBadge text={type} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: rw(48),
    height: rh(18),
    overflow: 'hidden',
    marginRight: SPACING.small,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'space-between',
  },

  image: {
    width: rw(48),
    height: rh(10),
    borderRadius: BORDER_RADIUS.tiny,
  },

  content: { paddingHorizontal: 1 },
  name: {
    fontFamily: FONTS.semiBold600,
    fontSize: FONT_SIZE.normal,
    color: COLORS.text,
    fontWeight: '600',
  },
  subtext: {
    fontFamily: FONTS.regular400,
    fontSize: FONT_SIZE.small,
    fontWeight: '400',
    color: COLORS.grayText,
  },
});
