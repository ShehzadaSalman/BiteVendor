import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BORDER_RADIUS, FONT_SIZE } from '../../utils/spacing';
import { isIOS } from '../../utils/layout';
import { COLORS, FONTS } from '../../constants';
import HeaderComponent from '../../components/HeaderComponent';
import { useNavigation } from '@react-navigation/native';

const dummyProducts = [
  {
    id: '1',
    name: 'Cac-1000 Plus',
    price: 'Rs. 150',
    image: require('../../assets/images/Pharmacy/Cac-1000.png'),
  },
  {
    id: '2',
    name: 'Gaviscon',
    price: 'Rs. 150',
    image: require('../../assets/images/Pharmacy/gaviscon.png'),
  },
  {
    id: '3',
    name: 'Dr.Koff',
    price: 'Rs. 150',
    image: require('../../assets/images/Pharmacy/koff.png'),
  },
];

const dummyProducts2 = [
  {
    id: '1',
    name: 'PYTEX',
    price: 'Rs. 150',
    image: require('../../assets/images/Pharmacy/PYTEX.png'),
  },
  {
    id: '2',
    name: 'CELEBREX',
    price: 'Rs. 150',
    image: require('../../assets/images/Pharmacy/CELEBREX.png'),
  },
  {
    id: '3',
    name: 'Dr.Koff',
    price: 'Rs. 150',
    image: require('../../assets/images/Pharmacy/PYTEX.png'),
  },
];

export default function PharmacyScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent
        rightIcon={require('../../assets/images/Pharmacy/cart.png')}
        bottomBorder={false}
        onRightPress={() =>
          navigation.navigate('Home', {
            screen: 'Cart',
          })
        }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}

        <View style={styles.header}>
          <View style={styles.imageBox}>
            <Image
              source={require('../../assets/images/Pharmacy/servaid.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <View style={styles.itemTitleContainer}>
            <View style={styles.absolute}>
              <Text style={styles.itemTitle}>Servaid (Johar town)</Text>
              <Text style={styles.itemSubtitle}>Min Rs. 300</Text>
            </View>
          </View>
        </View>

        {/* Delivery Time */}
        <View style={styles.row}>
          <Image
            source={require('../../assets/images/Pharmacy/time.png')}
            style={styles.margin}
          />
          <Text style={styles.deliveryText}>
            Delivery in <Text style={styles.bold}>20–30</Text> mins
          </Text>
        </View>

        <View style={styles.searchBar}>
          <Image
            source={require('../../assets/images/Pharmacy/search.png')}
            resizeMode="contain"
          />
          <TextInput
            style={styles.input}
            placeholder="Search for a Product"
            placeholderTextColor={COLORS.grayText}
          />
        </View>

        {/* Product Sections */}
        <ProductSection title="Popular Products" data={dummyProducts} />
        <ProductSection title="Pain and Swelling" data={dummyProducts2} />
        <ProductSection title="Popular Products" data={dummyProducts} />
      </ScrollView>
    </SafeAreaView>
  );
}

const ProductSection = ({ title, data }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <FlatList
      horizontal
      data={data}
      keyExtractor={item => item.id}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.card}>
          <View style={styles.cardImageContaner}>
            <Image source={item.image} style={styles.cardImage} />
          </View>
          <Text style={styles.cardPrice}>{item.price}</Text>
          <Text style={styles.cardTitle}>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  deliveryText: {
    fontFamily: FONTS.medium500,
    marginVertical: 10,
    fontSize: FONT_SIZE.xSmall,
    color: COLORS.grayText1,
  },

  section: { marginTop: 20 },
  sectionTitle: {
    fontFamily: FONTS.bold700,
    fontSize: FONT_SIZE.normal,
    fontWeight: '700',
    marginBottom: 8,
  },

  card: {
    backgroundColor: 'white',
    padding: 10,
    width: 120,
    alignItems: 'flex-start',
  },
  cardImage: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    marginTop: 12,
  },
  cardImageContaner: {
    width: 90,
    height: 90,
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 0.4,
    borderColor: COLORS.borderGray,
    borderRadius: BORDER_RADIUS.tiny,
  },
  cardTitle: {
    fontFamily: FONTS.medium500,
    fontSize: FONT_SIZE.tiny,
    color: COLORS.grayText1,
  },
  cardPrice: {
    fontFamily: FONTS.bold700,
    fontSize: FONT_SIZE.xSmall,
    fontWeight: 'bold',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    borderWidth: 0.3,
    borderRadius: BORDER_RADIUS.small,
    height: isIOS ? 35 : 35,
  },
  input: {
    marginLeft: 8,
    flex: 1,
    fontFamily: FONTS.Light300,
    fontSize: FONT_SIZE.normal,
    color: COLORS.grayText,
    fontWeight: '300',
  },
  itemTitleContainer: {
    flex: 1,
    paddingHorizontal: 10,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  imageBox: {
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: 10,
    padding: 16,
    height: 80,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
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
  absolute: { position: 'absolute', top: -15, left: 7 },
  bold: { fontWeight: 'bold' },
  margin: { marginRight: 9 },
  row: { flexDirection: 'row', alignItems: 'center' },
});
