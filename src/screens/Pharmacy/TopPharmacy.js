import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '../../constants'; // Update this to your path
import { FONT_SIZE, BORDER_RADIUS } from '../../utils/spacing'; // Update this to your path
import HomeHeader from '../../components/Home/HomeHeader';

export default function TopPharmacy({ navigation }) {
  // const TopPharmacies = [
  //   {
  //     id: 1,
  //     label: 'Servaid',
  //     time: '20-30',
  //     price: '150',
  //     icon: require('../../assets/images/Pharmacy/servaid.png'),
  //   },
  //   {
  //     id: 2,
  //     label: 'FDPP',
  //     time: '20-30',
  //     price: '150',
  //     icon: require('../../assets/images/Pharmacy/FDPP.png'),
  //   },

  //   {
  //     id: 3,
  //     label: 'Health Care',
  //     time: '20-30',
  //     price: '150',
  //     icon: require('../../assets/images/Pharmacy/healthCare.png'),
  //   },
  // ];
  return (
    <SafeAreaView style={styles.topSafeArea} edges={['top']}>
      {/* Main content below */}
      <HomeHeader isLightGreen={true} />

      <View style={styles.container}>
        <Text style={styles.title}>Top Pharmacy</Text>
        {/* <FlatList
          data={TopPharmacies}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.orderRow}>
              <TouchableOpacity
                style={styles.imageBox}
                onPress={() => navigation.navigate('PharmacyScreen')}
              >
                <Image
                  source={item.icon}
                  style={styles.image}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <View style={styles.itemTitleContainer}>
                <Text style={styles.itemTitle}>{item.label}</Text>
                <View style={styles.row}>
                  <Image
                    source={require('../../assets/images/Pharmacy/time.png')}
                  />
                  <Text style={[styles.itemSubtitle, { fontWeight: 'bold' }]}>
                    {item.time}
                  </Text>
                  <Text style={styles.itemSubtitle}>mins</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={require('../../assets/images/Pharmacy/rider.png')}
                  />
                  <Text style={styles.price}>Rs.{item.price}</Text>
                </View>
              </View>
            </View>
          )}
          contentContainerStyle={styles.tabList}
        /> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topSafeArea: {
    flex: 1,
    backgroundColor: COLORS.lightGreen,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background, // White main background
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemTitleContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  orderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  itemTitle: {
    fontSize: FONT_SIZE.normal,
    fontFamily: FONTS.semiBold600,
    color: COLORS.text,
    fontWeight: '600',
  },
  itemSubtitle: {
    fontSize: FONT_SIZE.small,
    fontFamily: FONTS.bold700,
    color: COLORS.grayText,
    marginVertical: 5,
    marginLeft: 2,
  },
  price: {
    fontSize: FONT_SIZE.small,
    fontFamily: FONTS.bold700,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
    marginLeft: 2,
  },
  imageBox: {
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: BORDER_RADIUS.tiny,
    padding: 16,
    height: 90,
    width: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 60,
  },
  padding: { padding: 16 },
  tabList: {
    paddingVertical: 10,
    paddingLeft: 12,
    // marginTop: 40,
  },
  title: {
    fontFamily: FONTS.medium500,
    fontSize: FONT_SIZE.normal,
    fontWeight: '500',
    color: COLORS.text,
    marginVertical: 10,
    marginLeft: 16,
  },
});
