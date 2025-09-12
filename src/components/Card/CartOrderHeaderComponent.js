import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../../constants';
import { BORDER_RADIUS, FONT_SIZE, rh } from '../../utils/spacing';
import InfoBadge from '../InfoBadge';

export default function CartOrderHeaderComponent({ quantity, setQuantity }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>My Order</Text>
      <View style={styles.orderRow}>
        <View style={styles.imageBox}>
          <Image
            source={require('../../assets/images/Cart/burgerCombo.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.itemTitleContainer}>
          <View style={{ position: 'absolute', top: -50, left: 7 }}>
            <Text style={styles.itemTitle}>Summer Deal</Text>
            <Text style={styles.itemSubtitle}>
              Single burger with fries and cold drink
            </Text>
            <InfoBadge text="Rs. 800.00" containerStyle={styles.price} />
          </View>
        </View>
        <View style={styles.counterBox}>
          <TouchableOpacity
            onPress={() => setQuantity(q => Math.max(1, q - 1))}
          >
            <Image source={require('../../assets/images/Cart/delete.png')} />
          </TouchableOpacity>
          <Text style={styles.counterText}>{quantity}</Text>
          <TouchableOpacity onPress={() => setQuantity(q => q + 1)}>
            <Image source={require('../../assets/images/Cart/add.png')} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.addMoreBtn}>
        <View style={styles.addMoreRow}>
          <Image source={require('../../assets/images/Cart/plus.png')} />
          <Text style={styles.addMoreText}> Add More Items</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  itemTitleContainer: {
    flex: 1,
    paddingHorizontal: 10,
    position: 'relative',
  },

  section: {
    padding: 16,
    borderBottomColor: COLORS.gray,
    borderBottomWidth: rh(0.8),
  },
  sectionTitle: {
    fontSize: FONT_SIZE.medium,
    fontFamily: FONTS.bold700,
    marginBottom: 6,
    fontWeight: 'bold',
    color: COLORS.text,
  },

  orderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'green',
  },

  itemTitle: {
    fontSize: FONT_SIZE.normal,
    fontFamily: FONTS.semiBold600,
    fontWeight: '600',
    color: COLORS.text,
  },
  itemSubtitle: {
    fontSize: FONT_SIZE.small,
    fontFamily: FONTS.medium500,
    fontWeight: '500',
    color: COLORS.grayText,
  },

  price: {
    width: 70,
    backgroundColor: COLORS.lightGreen,
    borderRadius: BORDER_RADIUS.tiny,
    paddingVertical: 3,
  },
  counterBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: COLORS.secondary,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.xtiny,
    marginTop: 80,
    width: 65,
    height: 22,
    paddingHorizontal: 5,
  },

  counterText: {
    fontFamily: FONTS.bold700,
    fontSize: FONT_SIZE.small,
    fontWeight: 'bold',
    marginHorizontal: 4,
  },
  addMoreBtn: {
    marginTop: 12,
    backgroundColor: COLORS.lightPink,
    borderColor: COLORS.secondary,
    height: rh(3.5),
    borderRadius: 5,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addMoreText: {
    color: COLORS.text,
    fontFamily: FONTS.bold700,
    fontWeight: 'bold',
    fontSize: FONT_SIZE.xSmall,
  },
  addMoreRow: {
    flexDirection: 'row',
    alignContent: 'space-between',
    justifyContent: 'center',
  },

  imageBox: {
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: 10,
    padding: 16,
    height: 100,
    width: 110,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
  },
});
