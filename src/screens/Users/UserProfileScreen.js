import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { COLORS, FONTS } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BORDER_RADIUS, FONT_SIZE } from '../../utils/spacing';
import { useNavigation } from '@react-navigation/native';

export default function UserProfileScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView style={styles.container}>
        <Text style={styles.username}>Name of Person</Text>

        {/* <View style={styles.actionsRow}>
          {[
            {
              label: 'Orders',
              icon: require('../../assets/images/user/orders.png'),
              navigation: 'PastOrdersScreen',
            },
            {
              label: 'Favourite',
              icon: require('../../assets/images/user/favorites.png'),
              navigation: 'Favourite',
            },
            {
              label: 'Address',
              icon: require('../../assets/images/user/address.png'),
              navigation: 'AddAddress',
            },
          ].map((item, i) => (
            <TouchableOpacity
              key={i}
              style={styles.box}
              onPress={() => navigation.navigate(item.navigation)}
            >
              <Image source={item.icon} style={styles.boxIcon} />
              <Text style={styles.boxLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View> */}

        <View style={styles.bitCreditBox}>
          <Text
            style={[
              styles.biteCreditText,
              {
                color: COLORS.grayText1,
              },
            ]}
          >
            Bite Credit
          </Text>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={() => navigation.navigate('PaymentNavigator')}
          >
            <Text
              style={[
                styles.biteCreditText,
                {
                  color: COLORS.black,
                },
              ]}
            >
              RS. 0.00
            </Text>
            {/* <Image
              source={require('../../assets/images/user/right-chevron.png')}
              style={{ marginLeft: 9 }}
            /> */}
          </TouchableOpacity>
        </View>

        {/* <Text style={styles.sectionTitle}>General</Text>
        {[
          {
            label: 'View profile',
            icon: require('../../assets/images/user/profile.png'),
            navigation: 'Profile',
            arrow: true,
          },
          {
            label: 'Help center',
            icon: require('../../assets/images/user/helpCenter.png'),
            navigation: 'HelpCenter',
            arrow: true,
          },
          {
            label: 'Terms and policies',
            icon: require('../../assets/images/user/TermsPolicies.png'),
            navigation: 'TermPolicy',
            arrow: true,
          },
        ].map((item, i) => (
          <TouchableOpacity
            key={i}
            style={styles.listItem}
            onPress={() => navigation.navigate(item.navigation)}
          >
            <View style={styles.listLeft}>
              <Image source={item.icon} style={styles.listIcon} />
              <Text style={styles.listLabel}>{item.label}</Text>
            </View>
            {item.arrow && (
              <Image
                source={require('../../assets/images/user/right-chevron.png')}
              />
            )}
          </TouchableOpacity>
        ))} */}

        {/* <Text style={styles.sectionTitle}>Perks for you</Text>
        {[
          {
            label: 'Vouchers',
            icon: require('../../assets/images/user/vouchers.png'),
            navigation: 'VouchersScreen',
          },
          {
            label: 'Invite friends',
            icon: require('../../assets/images/user/invitesFrnds.png'),
            navigation: 'ReferFriend',
          },
        ].map((item, i) => (
          <TouchableOpacity
            key={i}
            style={styles.listItem}
            onPress={() => navigation.navigate(item.navigation)}
          >
            <View style={styles.listLeft}>
              <Image source={item.icon} style={styles.listIcon} />
              <Text style={styles.listLabel}>{item.label}</Text>
            </View>
            <Image
              source={require('../../assets/images/user/right-chevron.png')}
            />
          </TouchableOpacity>
        ))} */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: COLORS.white },
  username: {
    fontSize: FONT_SIZE.large,
    fontFamily: FONTS.bold700,
    marginBottom: 20,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  box: {
    width: 106,
    height: 85,
    borderRadius: BORDER_RADIUS.tiny,
    borderWidth: 1,
    borderColor: COLORS.gray,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.lightPink,
  },
  boxIcon: {
    // width: 24, height: 24,
    marginBottom: 8,
  },
  boxLabel: {
    fontSize: FONT_SIZE.xSmall,
    fontFamily: FONTS.semiBold600,
    fontWeight: '600',
    color: COLORS.text,
  },
  sectionTitle: {
    marginTop: 25,
    fontSize: FONT_SIZE.large,
    fontFamily: FONTS.bold700,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.text,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
  listLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listIcon: {
    //width: 20,
    // height: 20,
    marginRight: 10,
  },
  listLabel: {
    fontSize: FONT_SIZE.normal,
    fontFamily: FONTS.semiBold600,
    fontWeight: '600',
    color: COLORS.grayText1,
  },
  bitCreditBox: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: BORDER_RADIUS.tiny,
    borderWidth: 1,
    borderColor: COLORS.gray,
    alignItems: 'center',
    backgroundColor: COLORS.lightPink,
  },
  biteCreditText: {
    fontFamily: FONTS.semiBold600,
    fontSize: FONT_SIZE.medium,
    fontWeight: '600',
  },
});
