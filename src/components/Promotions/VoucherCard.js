import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { COLORS, FONTS } from '../../constants';
import InfoBadge from '../InfoBadge';
import { BORDER_RADIUS, FONT_SIZE } from '../../utils/spacing';

export default function VoucherCard({
  title,
  code,
  description,
  minSpend,
  expiry,
  onUse,
}) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Image
          source={require('../../assets/images/Promotions/GreenVoucher.png')}
          style={styles.icon}
        />
        <Text style={styles.desc}>{title}</Text>
      </View>
      <View style={[styles.row, { justifyContent: 'space-between' }]}>
        <Text style={styles.title} />
        <InfoBadge
          text={code}
          //image={require('../../assets/images/Voucher/exclaimination.png')}
          containerStyle={styles.containerStyle}
          textStyle={styles.textStyle}
        />
      </View>
      <View style={[styles.row, styles.useMeContainer]}>
        <View>
          <Text style={styles.expiry}>{expiry}</Text>
        </View>
        <TouchableOpacity style={styles.useBtn} onPress={onUse}>
          <Text style={styles.useText}>Use now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    height: 126,
    // marginHorizontal: 16,
    borderColor: COLORS.borderGray,
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 4,
    alignItems: 'center',
  },
  icon: { marginRight: 12 },
  title: {
    fontFamily: FONTS.bold700,
    fontWeight: 'bold',
    fontSize: FONT_SIZE.normal,
    marginLeft: 10,
  },
  expiry: {
    fontFamily: FONTS.semiBold600,
    fontSize: FONT_SIZE.small,
    fontWeight: '600',
  },

  desc: {
    fontFamily: FONTS.medium500,
    fontSize: FONT_SIZE.xSmall,
    fontWeight: '500',
    marginVertical: 6,
    color: COLORS.grayText1,
  },
  minSpend: {
    fontFamily: FONTS.bold700,
    fontSize: FONT_SIZE.normal,
    fontWeight: 'bold',
    color: COLORS.grayText1,
  },
  useBtn: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.primary,
    padding: 5,
    borderRadius: BORDER_RADIUS.tiny,
  },
  useText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  containerStyle: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.medium,
  },
  textStyle: {
    color: COLORS.white,
    fontFamily: FONTS.bold700,
    fontSize: FONT_SIZE.medium,
    fontWeight: 'bold',
  },
  useMeContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    borderRadius: BORDER_RADIUS.tiny,
    paddingLeft: 9,
    marginTop: 3,
    justifyContent: 'space-between',
    //paddingVertical: 3,
  },
});
