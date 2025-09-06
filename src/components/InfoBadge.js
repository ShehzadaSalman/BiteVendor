import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../constants';
import { BORDER_RADIUS, FONT_SIZE } from '../utils/spacing';

const InfoBadge = ({
  text,
  time,
  image,
  containerStyle = {
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginTop: 4,
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.small,
  },
  textStyle = {},
}) => {
  if (time) {
    return (
      <View style={[styles.container, styles.row, containerStyle]}>
        {image && (
          <Image source={image} style={styles.image} resizeMode="contain" />
        )}
        <Text style={[styles.containerText, textStyle]}>{time}</Text>
        <Text style={styles.minsText}>mins</Text>
      </View>
    );
  }

  if (image && !time) {
    return (
      <View style={[styles.container, styles.row, containerStyle]}>
        {image && (
          <Image
            source={image}
            style={styles.riderImage}
            resizeMode="contain"
          />
        )}
        <View style={styles.container}>
          <Text style={[styles.containerText, textStyle]}>{text}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.containerText, textStyle]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    margin: 3,
  },
  containerText: {
    fontFamily: FONTS.bold700,
    fontWeight: 'bold',
    fontSize: FONT_SIZE.xSmall,
    color: COLORS.white,
  },
  minsText: {
    fontFamily: FONTS.regular400,
    fontWeight: '400',
    fontSize: FONT_SIZE.tiny,
    marginLeft: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    marginRight: 2,
  },
  riderImage: {
    marginRight: -8,
    marginLeft: 4,
  },
});

export default InfoBadge;
