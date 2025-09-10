import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS, FONTS } from '../../constants';
import { FONT_SIZE, rh } from '../../utils/spacing';
import HeaderComponent from '../../components/HeaderComponent';
import CustomTitle from '../../components/CustomTitle';
import CustomToggle from '../../components/CustomToggle';

const categories = [
  {
    title: 'Starters',
    data: [
      {
        id: '1',
        name: 'Chicken shots',
        price: 500,
        img: require('../../assets/images/Menu/item.png'),
      },
      {
        id: '2',
        name: 'Chicken shots',
        price: 500,
        img: require('../../assets/images/Menu/item.png'),
      },
      {
        id: '3',
        name: 'Chicken shots',
        price: 500,
        img: require('../../assets/images/Menu/item.png'),
      },
    ],
  },
  {
    title: 'Burgers',
    data: [
      {
        id: '4',
        name: 'Zinger Burger',
        price: 700,
        img: require('../../assets/images/Menu/item.png'),
      },
      {
        id: '5',
        name: 'Petty Burger',
        price: 800,
        img: require('../../assets/images/Menu/item.png'),
      },
      {
        id: '6',
        name: 'Tower Burger',
        price: 700,
        img: require('../../assets/images/Menu/item.png'),
      },
    ],
  },
  {
    title: 'Chinese',
    data: [
      {
        id: '7',
        name: 'Chowmein',
        price: 700,
        img: require('../../assets/images/Menu/item.png'),
      },
      {
        id: '8',
        name: 'Pasta',
        price: 800,
        img: require('../../assets/images/Menu/item.png'),
      },
      {
        id: '9',
        name: 'Manchurian',
        price: 700,
        img: require('../../assets/images/Menu/item.png'),
      },
    ],
  },
];

export default function MenuScreen() {
  const [selected, setSelected] = useState([]);

  const toggleSwitch = id => {
    if (selected.includes(id)) {
      setSelected(selected.filter(item => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.img} style={styles.image} />
      <View style={styles.textBox}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.price}>Rs. {item.price}</Text>
      </View>
      <CustomToggle isActive={selected} setIsActive={setSelected} />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <HeaderComponent
        title=""
        leftIcon="chevron"
        rightIcon={require('../../assets/images/Header/notification.png')}
      />

      <CustomTitle variant="title">Menu</CustomTitle>
      <CustomTitle variant="subtitle">Main menu</CustomTitle>
      <FlatList
        data={categories}
        keyExtractor={item => item.title}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.header}>{item.title}</Text>
            {item.data.map(menu => (
              <View key={menu.id}>{renderItem({ item: menu })}</View>
            ))}
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontFamily: FONTS.bold700,
    fontSize: FONT_SIZE.large,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: rh(3),
    paddingBottom: 9,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderGray,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderGray,
    paddingVertical: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  textBox: {
    flex: 1,
  },
  itemName: {
    fontFamily: FONTS.medium500,
    fontSize: FONT_SIZE.normal,
    color: COLORS.text,
  },
  price: {
    fontFamily: FONTS.regular400,
    fontSize: FONT_SIZE.small,
    color: COLORS.gray,
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
  },
});
