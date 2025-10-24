import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import { fetchOrders } from '../../services/DashboardService';

const FILTERS = ['Today', 'Yesterday', 'Last 7 days', '30 days'];

// API-driven orders state
const initialPageState = { page: 1, totalPages: 1 };

export default function OrderHistory() {
  const [selectedFilter, setSelectedFilter] = useState('Today');
  const [orders, setOrders] = useState([]);
  const [pageInfo, setPageInfo] = useState(initialPageState);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState('');

  const loadPage = useCallback(async (page = 1) => {
    try {
      if (page === 1) setLoading(true);
      else setLoadingMore(true);
      setError('');
      const res = await fetchOrders(page);
      const nextOrders = Array.isArray(res.orders) ? res.orders : [];
      setOrders(prev => (page === 1 ? nextOrders : [...prev, ...nextOrders]));
      setPageInfo({ page: res.currentPage, totalPages: res.totalPages });
    } catch (e) {
      setError(e?.message || 'Failed to load orders');
      if (page === 1) setOrders([]);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    loadPage(1);
  }, [loadPage]);

  const renderOrder = ({ item }) => (
    <View style={styles.orderCard}>
      <View style={styles.statusRow}>
        <View style={[styles.badge, getStatusStyle(item.status)]}>
          <Text style={styles.badgeText}>
            {String(item.status || '').toUpperCase()}
          </Text>
        </View>
      </View>
      <View style={styles.orderInfo}>
        <View>
          <Text style={styles.orderId}>{item.order_number}</Text>
          <Text style={styles.orderTime}>
            {new Date(item.created_at).toLocaleString()}
          </Text>
        </View>
        <Text style={styles.price}>Rs. {Number(item.total_amount || 0)}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={styles.title}>Order History</Text> */}
      <HeaderComponent
        title=""
        isCircle
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

      <Text style={styles.sectionTitle}>Recent</Text>

      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text style={{ color: COLORS.red }}>{error}</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={item => String(item.id)}
          renderItem={renderOrder}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          onEndReachedThreshold={0.4}
          onEndReached={() => {
            if (!loadingMore && pageInfo.page < pageInfo.totalPages) {
              loadPage(pageInfo.page + 1);
            }
          }}
          ListFooterComponent={
            loadingMore ? <Text>Loading more...</Text> : null
          }
          ListEmptyComponent={
            !loading && (
              <Text style={{ color: COLORS.grayText }}>No orders found.</Text>
            )
          }
        />
      )}
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
