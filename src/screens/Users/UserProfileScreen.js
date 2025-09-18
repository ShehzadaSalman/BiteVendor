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
import { FONT_SIZE } from '../../utils/spacing';
import { useNavigation } from '@react-navigation/native';
import PaymentMethodComponent from '../../components/Payment/PaymentMethodComponent';

export default function UserProfileScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView style={styles.container}>
        <Text style={styles.sectionTitle}>General</Text>
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
          {
            label: 'Add promotions',
            icon: require('../../assets/images/user/Coupon.png'),
            navigation: 'Promotions',
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
        ))}
        <PaymentMethodComponent />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: { flex: 1, backgroundColor: COLORS.background },
  container: { padding: 20, backgroundColor: COLORS.white },

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
});
