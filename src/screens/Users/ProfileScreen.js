import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '../../constants';
import HeaderComponent from '../../components/HeaderComponent';
import { FONT_SIZE } from '../../utils/spacing';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useVendor } from '../../services/VendorProvider';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const inets = useSafeAreaInsets();
  const { vendor, loading } = useVendor();
  const displayName = vendor?.name || vendor?.restaurant_name || '—';
  const displayEmail = vendor?.email || '—';
  const displayPhone = vendor?.phone || vendor?.alternate_phone || '—';

  return (
    <SafeAreaView style={[styles.safeArea, {}]}>
      <HeaderComponent title="Profile" bottomBorder={true} />
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Personal Details</Text>

        <Field
          label="Name"
          value={displayName}
          onPress={() => navigation.navigate('EditName')}
        />
        <Field
          label="Email"
          value={displayEmail}
          onPress={() => navigation.navigate('EditEmail')}
        />
        <Field
          label="Mobile No"
          value={displayPhone}
          onPress={() => navigation.navigate('EditMobile')}
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
});
