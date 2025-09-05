import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '../../constants';
import { BORDER_RADIUS, FONT_SIZE } from '../../utils/spacing';
import { useNavigation } from '@react-navigation/native';
import PhoneSigninComponent from '../../components/Authentication/PhoneSigninComponent';

export default function PhoneLoginScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.headerContainer}>
        <Image
          source={require('../../assets/images/Authentication/LogosBite.png')}
          style={styles.headerIcon}
        />
        <Text style={styles.title}>
          Run your business from the palm of your hand
        </Text>
      </View>
      <View style={styles.innerContainer}>
        <View style={styles.bottomCard}>
          <View style={styles.bottomCardContent}>
            <PhoneSigninComponent />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  innerContainer: {
    flex: 1,
    //justifyContent: 'flex-end',
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  bottomCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: BORDER_RADIUS.normal,
    borderTopRightRadius: BORDER_RADIUS.normal,
  },
  bottomCardContent: {
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 20,
  },
  title: {
    fontFamily: FONTS.bold700,
    fontSize: FONT_SIZE.xxlarge,
    fontWeight: 'bold',
    color: COLORS.white,
    marginTop: 20,
    marginBottom: 40,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  headerContainer: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIcon: {
    marginTop: 20,
  },
});
