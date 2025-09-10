import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS, FONTS } from '../../constants';
import HeaderComponent from '../../components/HeaderComponent';
import CustomTitle from '../../components/CustomTitle';
import { FONT_SIZE } from '../../utils/spacing';

const FILTERS = ['Today', 'Yesterday', 'Last 7 days', '30 days'];

const orders = [
  {
    id: '1',
    status: 'IN PROGRESS',
    code: 'x1db-a5k7',
    time: 'Today 12:14',
    price: 2500,
  },
  {
    id: '2',
    status: 'CANCELLED',
    code: 'x1db-a5k7',
    time: 'Today 12:14',
    price: 2500,
  },
  {
    id: '3',
    status: 'PICK-UP',
    extraStatus: 'COMPLETED',
    code: 'x1db-a5k7',
    time: 'Today 12:14',
    price: 2500,
  },
  {
    id: '4',
    status: 'COMPLETED',
    code: 'x1db-a5k7',
    time: 'Today 12:14',
    price: 2500,
  },
  {
    id: '5',
    status: 'COMPLETED',
    code: 'x1db-a5k7',
    time: 'Today 12:14',
    price: 2500,
  },
];

export default function OrderHistory() {
  const [selectedFilter, setSelectedFilter] = useState('Today');

  const renderOrder = ({ item }) => (
    <View style={styles.orderCard}>
      <View style={styles.statusRow}>
        <View style={[styles.badge, getStatusStyle(item.status)]}>
          <Text style={styles.badgeText}>{item.status}</Text>
        </View>
        {item.extraStatus && (
          <View style={[styles.badge, getStatusStyle(item.extraStatus)]}>
            <Text style={styles.badgeText}>{item.extraStatus}</Text>
          </View>
        )}
      </View>
      <View style={styles.orderInfo}>
        <View>
          <Text style={styles.orderId}>{item.code}</Text>
          <Text style={styles.orderTime}>{item.time}</Text>
        </View>
        <Text style={styles.price}>Rs. {item.price}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={styles.title}>Order History</Text> */}
      <HeaderComponent
        title=""
        leftIcon="chevron"
        rightIcon={require('../../assets/images/Header/notification.png')}
      />

      <CustomTitle variant="title">Order History</CustomTitle>

      {/* Filters */}
      <View style={styles.filterRow}>
        {FILTERS.map(filter => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              selectedFilter === filter && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter && styles.filterTextActive,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Today</Text>

      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={renderOrder}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

const getStatusStyle = status => {
  switch (status) {
    case 'IN PROGRESS':
      return { backgroundColor: COLORS.primary };
    case 'CANCELLED':
      return { backgroundColor: COLORS.red };
    case 'PICK-UP':
      return { backgroundColor: COLORS.primary };
    case 'COMPLETED':
      return { backgroundColor: COLORS.primary };
    default:
      return { backgroundColor: COLORS.gray };
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16,
  },

  filterRow: {
    flexDirection: 'row',
    marginBottom: 16,
    marginTop: 16,
    flexWrap: 'wrap',
    gap: 8,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.borderGray,
  },
  filterButtonActive: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    fontSize: 14,
    color: COLORS.black,
  },
  filterTextActive: {
    color: COLORS.white,
  },
  sectionTitle: {
    fontFamily: FONTS.bold700,
    fontSize: FONT_SIZE.large,
    fontWeight: '700',
    marginBottom: 12,
  },
  orderCard: {
    paddingVertical: 12,
  },
  statusRow: {
    flexDirection: 'row',
    marginBottom: 6,
    gap: 8,
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  badgeText: {
    fontFamily: FONTS.semiBold600,
    fontWeight: '600',
    fontSize: FONT_SIZE.xSmall,
    color: COLORS.white,
  },
  orderInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderId: {
    fontFamily: FONTS.bold700,
    fontSize: FONT_SIZE.medium,
    fontWeight: '700',
    color: COLORS.text,
  },
  orderTime: {
    fontFamily: FONTS.medium500,
    fontWeight: '500',
    fontSize: FONT_SIZE.normal,
    color: COLORS.grayText,
    marginTop: 2,
  },
  price: {
    fontFamily: FONTS.bold700,

    fontSize: FONT_SIZE.xlarge,
    fontWeight: '700',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderGray,
  },
});
