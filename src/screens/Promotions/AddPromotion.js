import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import VoucherCard from '../../components/Promotions/VoucherCard';
import { COLORS, FONTS } from '../../constants';
import HeaderComponent from '../../components/HeaderComponent';
import CustomTitle from '../../components/CustomTitle';
import { FONT_SIZE } from '../../utils/spacing';

export const mockPromotions = [
  {
    id: '1',
    title: 'Title...',
    expiry: 'Last date..',
    redeemed: false,
  },
  {
    id: '2',
    title: 'Title...',
    expiry: 'Last date..',
    redeemed: false,
  },
  {
    id: '3',
    title: 'Title...',
    expiry: 'Last date..',
    redeemed: true,
  },
  {
    id: '4',
    title: 'Title...',
    expiry: 'Last date..',
    redeemed: false,
  },
  {
    id: '5',
    title: 'Title...',
    expiry: 'Last date..',
    redeemed: false,
  },
];

export default function AddPromotion({ navigation }) {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <View style={styles.container}>
        <HeaderComponent
          title=""
          leftIcon="chevron"
          rightIcon={require('../../assets/images/Header/notification.png')}
        />

        <CustomTitle variant="title">Add Promotions</CustomTitle>

        <FlatList
          data={mockPromotions}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <VoucherCard
              title={item.title}
              code="Voucher no.."
              description={item.description}
              minSpend={item.minSpend}
              expiry={item.expiry}
              onUse={() => {}}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.message}>No Promotion available</Text>
          }
          contentContainerStyle={styles.contentStyle}
        />

        {/* Button always visible at bottom */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('UpdatedPromotion')}
        >
          <Text style={styles.buttonText}>Add promotions</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: { flex: 1, paddingHorizontal: 16 },
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
  contentStyle: {
    paddingBottom: 20,
    paddingTop: 50,
  },
  message: {
    fontFamily: FONTS.bold700,
    fontSize: FONT_SIZE.xlarge,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});
