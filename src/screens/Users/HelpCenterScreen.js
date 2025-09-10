import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';
import { BORDER_RADIUS, FONT_SIZE } from '../../utils/spacing';
import { COLORS, FONTS } from '../../constants';

const helpOptions = [
  {
    text: 'Get help with my orders',
    icon: require('../../assets/images/HelpCenter/order.png'),
  },
  {
    text: 'I’m having trouble placing an order',
    icon: require('../../assets/images/HelpCenter/order.png'),
  },
  {
    text: 'My support requests',
    icon: require('../../assets/images/HelpCenter/request.png'),
  },
  {
    text: 'My Account',
    icon: require('../../assets/images/HelpCenter/account.png'),
  },
  {
    text: 'Safety Concerns',
    icon: require('../../assets/images/HelpCenter/safety.png'),
  },
  {
    text: 'Payment and Refunds',
    icon: require('../../assets/images/HelpCenter/creditCard.png'),
  },

  {
    text: 'Vouchers and Rewards',
    icon: require('../../assets/images/HelpCenter/DiscountCoupon.png'),
  },
  {
    text: 'Get help with Bite',
    icon: require('../../assets/images/HelpCenter/help.png'),
  },
  {
    text: 'FAQ’s',
    icon: require('../../assets/images/HelpCenter/FAQ.png'),
  },
  {
    text: 'Bite for business',
    icon: require('../../assets/images/HelpCenter/business.png'),
  },
];

const HelpCenterScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  return (
    <View style={styles.container}>
      <HeaderComponent title="Help Center" />

      <ScrollView>
        {/* Search */}
        <Text style={styles.heading}>How can we help?</Text>

        <View style={styles.searchBox}>
          <Image
            source={require('../../assets/images/HelpCenter/search.png')}
          />
          <TextInput
            placeholder="Write here"
            style={styles.input}
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <Text style={styles.note}>
          Note: If you’re trying to search for anything related to your ongoing
          orders, navigate to{' '}
          <Text style={styles.link}>‘Get Help With My Orders’</Text>
        </Text>

        {/* Help Options */}
        {helpOptions.map((item, index) => (
          <TouchableOpacity key={index} style={styles.option}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={item.icon} style={{ marginRight: 7 }} />
              <Text style={styles.optionText}>{item.text}</Text>
            </View>
            {/* <Text style={styles.arrow}>›</Text> */}
            <Image
              source={require('../../assets/images/HelpCenter/right-chevron.png')}
              style={styles.arrow}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default HelpCenterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.normal,
    borderColor: COLORS.gray,
    borderWidth: 1,
    paddingHorizontal: 10,
    width: '100%',
    marginVertical: 30,
    height: 40,
  },
  input: {
    marginLeft: 8,
    flex: 1,
    color: COLORS.black,
    fontFamily: FONTS.regular400,
    fontWeight: '400',
  },

  heading: {
    fontFamily: FONTS.extrabold800,
    fontWeight: '800',
    fontSize: FONT_SIZE.large,
    lineHeight: FONT_SIZE.large * 1.5,
    marginTop: 20,
  },

  note: {
    fontFamily: FONTS.medium500,
    fontWeight: '500',
    fontSize: FONT_SIZE.medium,
    color: COLORS.text,
    marginBottom: 16,
  },
  link: {
    fontFamily: FONTS.medium500,
    fontWeight: '500',
    fontSize: FONT_SIZE.medium,
    color: COLORS.primary,
  },
  option: {
    flexDirection: 'row',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionText: {
    fontSize: FONT_SIZE.medium,
    fontFamily: FONTS.bold700,
    fontWeight: 'bold',
  },

  arrow: {
    width: 8,
    height: 8,
  },
});
