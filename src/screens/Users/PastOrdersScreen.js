import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '../../constants';
import { BORDER_RADIUS, FONT_SIZE } from '../../utils/spacing';
import HeaderComponent from '../../components/HeaderComponent';
import InfoBadge from '../../components/InfoBadge';
import { useNavigation } from '@react-navigation/native';

const pastOrders = [
  {
    id: '1',
    image: require('../../assets/images/Cart/pastOrder.png'), // Replace with your local image
    title: 'Kababjees Fried Chicken - Gulshan E...',
    date: '14 July, 12:01 am',
    items: 'Crunch chicken Alfredo Pasta , Al Baik sauce , Ultimate Feast Box',
    price: 'Rs. 800.00',
  },
  {
    id: '2',
    image: require('../../assets/images/Cart/pastOrder.png'), // Replace with your local image
    title: 'Kababjees Fried Chicken - Gulshan E...',
    date: '14 July, 12:01 am',
    items: 'Crunch chicken Alfredo Pasta , Al Baik sauce , Ultimate Feast Box',
    price: 'Rs. 800.00',
  },
  {
    id: '3',
    image: require('../../assets/images/Cart/pastOrder.png'), // Replace with your local image
    title: 'Kababjees Fried Chicken - Gulshan E...',
    date: '14 July, 12:01 am',
    items: 'Crunch chicken Alfredo Pasta , Al Baik sauce , Ultimate Feast Box',
    price: 'Rs. 800.00',
  },
  // Add more orders as needed
];

const PastOrdersScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent title="Past Orders" />
      <Text style={styles.header}>Past Orders</Text>
      <FlatList
        data={pastOrders}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.imageContainer}>
              <Image source={item.image} style={styles.image} />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <View style={styles.row}>
                <Text style={styles.label}>Delivered on</Text>
                <Text style={styles.date}>{item.date}</Text>
              </View>
              <Text style={styles.description}>{item.items}</Text>
              <View style={styles.footer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    navigation.navigate('Home', {
                      screen: 'Restaurant',
                      params: {
                        screen: 'RestaurantCategory',
                        params: { reorder: true },
                      },
                    });
                  }}
                >
                  <Text style={styles.buttonText}>Reorder</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.priceContainer}>
                <InfoBadge text={item.price} />
              </View>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.background,
  },
  header: {
    fontSize: FONT_SIZE.large,
    fontFamily: FONTS.semiBold600,
    color: COLORS.text,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: COLORS.black, //'#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    backgroundColor: COLORS.lightPink,
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: COLORS.gray, //'#ccc',
    borderRadius: 10,
    padding: 8,
    marginRight: 12,
    backgroundColor: COLORS.white,
  },
  image: {
    width: 90,
    height: 90,
    marginRight: 12,
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontFamily: FONTS.semiBold600,
    fontSize: FONT_SIZE.normal,
    fontWeight: '600',
    color: COLORS.text,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontFamily: FONTS.medium500,
    fontWeight: '500',
    fontSize: FONT_SIZE.normal,
    color: COLORS.text,
    marginTop: 4,
  },
  date: {
    fontSize: FONT_SIZE.xSmall,
    fontFamily: FONTS.medium500,
    color: COLORS.grayText1,
  },
  description: {
    fontSize: FONT_SIZE.xSmall,
    fontFamily: FONTS.medium500,
    fontWeight: '500',
    color: COLORS.grayText1,
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: BORDER_RADIUS.small,
  },
  buttonText: {
    color: COLORS.white,
    fontFamily: FONTS.bold700,
    fontWeight: 'bold',
    fontSize: FONT_SIZE.normal,
    lineHeight: FONT_SIZE.normal * 1.4,
  },
  price: {
    color: COLORS.text,
    fontWeight: '700',
  },
  priceContainer: { position: 'absolute', right: 0, top: 17 },
});

export default PastOrdersScreen;
