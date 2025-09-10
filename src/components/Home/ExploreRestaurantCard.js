import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { BORDER_RADIUS, FONT_SIZE, SPACING, rh, rw } from '../../utils/spacing';
import { SCREEN_WIDTH } from '../../utils/layout';
import { FONTS, COLORS } from '../../constants';
import InfoBadge from '../InfoBadge';

export default function ExploreRestaurantCard({
  image,
  name,
  rating,
  subrating,
  subTitle,
  rider,
  total,
  time,
  type,
  onPress,
  isHome = false,
}) {
  return (
    <TouchableOpacity
      style={[styles.card, isHome ? {} : styles.cardBorder]}
      onPress={onPress}
    >
      <Image source={image} style={styles.image} resizeMode="cover" />
      <View style={{ marginHorizontal: 9, marginBottom: 15 }}>
        <View style={styles.nameRow}>
          <Text style={styles.title}>{name}</Text>
          <View style={styles.ratingContainer}>
            <Image
              source={require('../../assets/images/Home/Featured/start.png')}
            />
            <Text style={styles.rating}>{rating}</Text>
            <Text style={styles.subrating}>{subrating}</Text>
          </View>
        </View>

        <Text style={styles.subtext}>{subTitle}</Text>
        {rider && (
          <View style={styles.containerRow}>
            <InfoBadge
              text={rider}
              image={require('../../assets/images/Home/Featured/rider.png')}
              containerStyle={styles.riderContainer}
            />
          </View>
        )}
        {total && time && type && (
          <View style={styles.containerRow}>
            <InfoBadge text={total} />
            <InfoBadge
              image={require('../../assets/images/Home/Featured/time.png')}
              time={time}
            />
            <InfoBadge text={type} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: rh(1),
    width: SCREEN_WIDTH - 30,
    overflow: 'hidden',
    marginHorizontal: 15,
  },
  cardBorder: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: BORDER_RADIUS.small,
  },
  image: {
    width: SCREEN_WIDTH - 30, // screen width minus some horizontal padding
    height: 180,
    borderRadius: BORDER_RADIUS.small,
    marginBottom: rh(1),
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontFamily: FONTS.semiBold600,
    fontSize: FONT_SIZE.medium,
    fontWeight: '600',
    color: COLORS.text,
    lineHeight: FONT_SIZE.medium + 2,
  },
  ratingContainer: { flexDirection: 'row', alignItems: 'center' },
  rating: {
    fontFamily: FONTS.semiBold600,
    fontSize: FONT_SIZE.normal,
    fontWeight: '600',
    color: COLORS.text,
  },
  subrating: {
    fontFamily: FONTS.semiBold600,
    fontSize: FONT_SIZE.xSmall,
    fontWeight: '600',
    color: COLORS.grayText,
    lineHeight: FONT_SIZE.xSmall + 2,
  },
  containerRow: {
    flexDirection: 'row',
    //paddingTop: 4,
  },
  subtext: {
    fontFamily: FONTS.regular400,
    fontSize: FONT_SIZE.xSmall,
    fontWeight: '400',
    color: COLORS.grayText,
  },
  riderContainer: {
    backgroundColor: COLORS.lightGreen,
    borderRadius: BORDER_RADIUS.tiny,
    paddingHorizontal: 1,
  },
});
