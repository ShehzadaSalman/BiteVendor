import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '../../constants';
import HeaderComponent from '../../components/HeaderComponent';
import CustomTitle from '../../components/CustomTitle';
import { BORDER_RADIUS, FONT_SIZE } from '../../utils/spacing';

const PromotionsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent
        title=""
        leftIcon="chevron"
        isCircle
        rightIcon={require('../../assets/images/Header/notification.png')}
      />

      <CustomTitle variant="title">Promotions</CustomTitle>
      <CustomTitle variant="subtitle" style={{ color: COLORS.grayText }}>
        Recomended for you
      </CustomTitle>

      <ScrollView
        style={{ flex: 1, marginTop: 10 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}

        {/* Top card */}
        <View style={styles.promoCard}>
          <View style={styles.cardLeft}>
            <View style={[styles.badge, { marginLeft: 16 }]}>
              <Text style={styles.discountText}>Discount + BiteClick</Text>
            </View>
            <View style={styles.iconRow}>
              <View style={styles.squareBorder}>
                <Image
                  source={require('../../assets/images/Promotions/discount.png')}
                  style={styles.icon}
                />
              </View>

              <Text style={styles.plusSign}> + </Text>
              <View
                style={[styles.squareBorder, { justifyContent: 'flex-end' }]}
              >
                <Image
                  source={require('../../assets/images/Promotions/biteClick.png')}
                  style={styles.icon}
                />
              </View>
            </View>
          </View>
          <Image
            source={require('../../assets/images/Promotions/promotionLogo.png')}
            style={styles.maskot}
          />
        </View>

        {/* Growth Bundle */}
        <Text style={styles.sectionTitle}>Growth Bundle</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>30% Discount</Text>
        </View>
        <Text style={styles.description}>
          Amplify your discount campaign together with a biteclicks ad.
        </Text>

        <View style={styles.highlightCard}>
          <Image
            source={require('../../assets/images/Promotions/increase.png')}
            style={{ marginRight: 10 }}
          />
          <Text style={styles.highlightText}>Upto 2x sales increase</Text>
        </View>

        {/* Did you know */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Did you know?</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.infoBold}>50% </Text>
            <Text style={styles.infoDesc}>
              Orders in your area have {'\n'} discount applied
            </Text>
          </View>
        </View>

        {/* Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AddPromotions')}
        >
          <Text style={styles.buttonText}>Add promotions</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  subTitle: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 12,
  },
  promoCard: {
    flexDirection: 'row',
    height: 145,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    borderRadius: 12,
    marginBottom: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardLeft: {
    flex: 1,
  },
  discountTextContainer: {
    paddingLeft: 5,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    textAlign: 'center',
    width: 170,
    height: 23,
    marginLeft: 16,
  },
  discountText: {
    fontFamily: FONTS.semiBold600,
    fontSize: FONT_SIZE.medium,

    fontWeight: '600',
    // marginBottom: 8,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 16,
  },
  icon: {
    // width: 30,
    // height: 30,
    // resizeMode: 'contain',
    //marginHorizontal: 4,
  },
  plusSign: {
    fontFamily: FONTS.bold700,
    fontWeight: 'bold',
    fontSize: FONT_SIZE.xxlarge,
    color: COLORS.primary,
  },
  maskot: {
    marginTop: -11,
  },
  sectionTitle: {
    fontFamily: FONTS.bold700,
    fontSize: FONT_SIZE.xlarge,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  badge: {
    backgroundColor: COLORS.primary,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  badgeText: {
    fontFamily: FONTS.semiBold600,
    color: COLORS.white,
    fontSize: FONT_SIZE.large,
    fontWeight: '600',
  },
  description: {
    fontFamily: FONTS.semiBold600,
    fontSize: FONT_SIZE.medium,
    color: COLORS.text,
    marginVertical: 12,
  },
  highlightCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  highlightText: {
    color: COLORS.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },
  infoTitle: {
    fontFamily: FONTS.bold700,
    fontSize: FONT_SIZE.large,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  infoDesc: {
    fontFamily: FONTS.semiBold600,
    fontSize: FONT_SIZE.medium,
    color: COLORS.text,
  },
  infoBold: {
    fontFamily: FONTS.bold700,
    fontSize: FONT_SIZE.xxxlarge,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 15,
  },
  squareBorder: {
    width: 65,
    height: 63,
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    borderRadius: BORDER_RADIUS.tiny,
    alignItems: 'center',
    justifyContent: 'center',
    //marginBottom: 10,
  },
});

export default PromotionsScreen;
