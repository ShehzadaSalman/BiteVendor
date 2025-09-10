import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTS } from '../../constants';
import HeaderComponent from '../../components/HeaderComponent';
import { FONT_SIZE, rh, rw } from '../../utils/spacing';
import InfoBadge from '../../components/InfoBadge';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const inets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.safeArea, { paddingTop: inets.top }]}>
      <View style={styles.container}>
        <HeaderComponent title="Profile" />
        <Text style={styles.sectionTitle}>Personal Details</Text>

        <Field
          label="Name"
          value="Name of person"
          onPress={() => navigation.navigate('EditName')}
        />
        <Field
          label="Email"
          value="person@gmail.com"
          onPress={() => navigation.navigate('EditEmail')}
        />
        <Field
          label="Mobile No"
          value="0300-*******"
          onPress={() => navigation.navigate('EditMobile')}
        />

        <Text style={styles.sectionTitle}>Connected accounts</Text>
        <ConnectedAccount
          label="Facebook"
          src={require('../../assets/images/user/fb.png')}
        />
        <ConnectedAccount
          label="Google"
          src={require('../../assets/images/user/google.png')}
        />
        <ConnectedAccount
          label="Apple"
          src={require('../../assets/images/user/apple.png')}
        />
      </View>
    </SafeAreaView>
  );
}

const Field = ({ label, value, onPress }) => (
  <TouchableOpacity style={styles.row} onPress={onPress}>
    <View style={{ flex: 1 }}>
      <Text style={styles.label}>{label}</Text>
    </View>
    <View style={{ flexDirection: 'row' }}>
      <Text style={styles.value}>{value}</Text>
      <Image source={require('../../assets/images/user/pencil.png')} />
    </View>
  </TouchableOpacity>
);

const ConnectedAccount = ({ label, src }) => (
  <View style={styles.row}>
    <View style={styles.connectedRow}>
      <Image source={src} style={{ marginRight: 13 }} />
      <Text style={styles.label}>{label}</Text>
    </View>
    <InfoBadge text="Connected" />
  </View>
);

const styles = StyleSheet.create({
  safeArea: { backgroundColor: COLORS.background, flex: 1 },
  container: { padding: 16 },
  sectionTitle: {
    fontFamily: FONTS.bold700,
    fontSize: FONT_SIZE.medium,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 20,
    marginBottom: 5,
  },
  label: {
    fontSize: FONT_SIZE.normal,
    color: COLORS.text,
    fontFamily: FONTS.semiBold600,
    fontWeight: '600',
  },
  value: {
    fontSize: FONT_SIZE.normal,
    color: COLORS.grayText1,
    fontFamily: FONTS.semiBold600,
    fontWeight: '600',
    marginRight: 9,
  },
  connectedRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
