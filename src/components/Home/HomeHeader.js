import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { COLORS, FONTS } from '../../constants';
import { BORDER_RADIUS, FONT_SIZE } from '../../utils/spacing';
import { isIOS } from '../../utils/layout';
import SearchBar from './SearchBar';
import { useNavigation } from '@react-navigation/native';

export default function HomeHeader({
  isLightGreen = false,
  isSearchBg = true,
}) {
  const navigation = useNavigation();
  // Determine colors based on the theme
  const headerBg = isLightGreen ? COLORS.lightGreen : COLORS.primary;
  const textColor = isLightGreen ? COLORS.text : COLORS.white;
  const searchBg = isSearchBg ? COLORS.white : COLORS.gray;
  const locationIcon = isLightGreen
    ? require('../../assets/images/Home/location-black.png')
    : require('../../assets/images/Home/location-white.png');

  return (
    <View style={[styles.header, { backgroundColor: headerBg }]}>
      <View style={styles.locationRow}>
        <TouchableOpacity
          style={styles.locationTextRow}
          onPress={() =>
            navigation.navigate('Account', {
              screen: 'MapAddress', // 👈 the target screen inside ProfileNavigator
            })
          }
        >
          <Image
            source={locationIcon}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={[styles.locationBold, { color: textColor }]}>
            Lahore
          </Text>
        </TouchableOpacity>
        {!isLightGreen && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Cart', {
                screen: 'CartScreen',
              })
            }
          >
            <Image
              source={require('../../assets/images/Home/card-white.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>

      <Text
        style={[
          styles.address,
          { color: isLightGreen ? COLORS.grayText1 : COLORS.white },
        ]}
      >
        al nafora hotel, johar, Block P........
      </Text>

      <SearchBar searchBg={searchBg} placeholder="Search for a Restaurant" />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 7,
  },
  locationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 20,
    height: 20,
  },
  locationBold: {
    fontFamily: FONTS.bold700,
    fontSize: FONT_SIZE.large,
    fontWeight: 'bold',
  },
  address: {
    fontFamily: FONTS.medium500,
    fontSize: FONT_SIZE.normal,
    fontWeight: '500',
    marginBottom: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderRadius: BORDER_RADIUS.tiny,
    height: isIOS ? 25 : 35,
  },
  input: {
    // marginLeft: 8,
    flex: 1,
    fontFamily: FONTS.Light300,
    fontSize: FONT_SIZE.normal,
    color: COLORS.grayText,
    fontWeight: '300',
    textAlignVertical: 'center', // ✅ Fix for Android
    paddingVertical: 0, // ✅ Prevent extra padding on Android
  },
});
