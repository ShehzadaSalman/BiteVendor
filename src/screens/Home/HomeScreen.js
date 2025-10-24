import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { COLORS, FONTS } from '../../constants';
import { FONT_SIZE, rh, rw } from '../../utils/spacing';
import BarChartComponent from '../../components/Home/BarChartComponent';
import HorizontalFilters from '../../components/Home/HorizontalFilters';
import { FilterChartContext } from '../../services/FilterChartProvider';
// import HorizontalFilters from '../../components/Home/HorizontalFilters';
import OperationHealthComponent from '../../components/Home/OperationHealthComponent';
import CustomTitle from '../../components/CustomTitle';
import { useVendor } from '../../services/VendorProvider';
import { fetchDashboard } from '../../services/DashboardService';

const mapFilterToRange = filter => {
  switch (filter) {
    case 'Today':
      return 'today';
    case 'Yesterday':
      return 'yesterday';
    case '7 days':
      return '7days';
    case '30 days':
      return '30days';
    case 'All':
      return 'all';
    default:
      return 'all';
  }
};

export default function HomeScreen() {
  // const navigation = useNavigation();
  const { selected } = useContext(FilterChartContext);
  const { vendor, logout } = useVendor();
  const [menuOpen, setMenuOpen] = useState(false);
  // const orders = useSelector(state => state.orders.list);
  // const cusines = useSelector(state => state.cuisines.list);
  // const restaurants = useSelector(state => state.restaurants.list);
  // const exploreRestaurants = useSelector(state => state.restaurants.list);

  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const range = mapFilterToRange(selected);
        const res = await fetchDashboard(range);
        const data = res?.data || {};
        const summaryData = data?.summary || {};
        setSummary(summaryData);
        setOrders(summaryData?.total_orders || 0);
        setRevenue(summaryData?.revenue || 0);
        const chart = Array.isArray(data?.chart) ? data.chart : [];
        // map to values for chart component; it expects [{ value }]
        setChartData(
          chart.map(item => ({
            value: item?.orders || 0,
            label: item?.period,
          })),
        );
      } catch (e) {
        setSummary(null);
        setOrders(0);
        setRevenue(0);
        setChartData([]);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [selected]);
  return (
    <View style={{ flex: 1 }}>
      {/* Colored SafeArea only for top inset */}
      <SafeAreaView style={styles.topSafeArea} edges={['top']} />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.circle}>
            <Image
              source={require('../../assets/images/overview/notification.png')}
            />
          </View>
          <View style={{ position: 'relative' }}>
            <View style={styles.circle}>
              <Text
                style={styles.profileText}
                onPress={() => setMenuOpen(!menuOpen)}
              >
                {(() => {
                  const name = vendor?.name || vendor?.restaurant_name || '';
                  const parts = name.trim().split(' ').filter(Boolean);
                  if (parts.length === 0) return '';
                  if (parts.length === 1)
                    return parts[0].charAt(0).toUpperCase();
                  return (
                    parts[0].charAt(0).toUpperCase() +
                    parts[parts.length - 1].charAt(0).toUpperCase()
                  );
                })()}
              </Text>
            </View>
            {/* dropdown moved to root overlay to avoid layering issues */}
          </View>
        </View>

        {/* Title */}

        <CustomTitle variant="title">Overview</CustomTitle>
        <CustomTitle variant="subtitle" style={{ marginTop: 4 }}>
          Summary
        </CustomTitle>

        <HorizontalFilters />

        {/* Stats Card */}
        <View style={styles.card}>
          {loading ? (
            <ActivityIndicator
              size="large"
              color={COLORS.primary}
              style={{ marginVertical: 40 }}
            />
          ) : (
            <>
              <View style={styles.statsRow}>
                <View style={styles.statsRow}>
                  <View>
                    <Text style={styles.statLabel}>Orders</Text>
                    <Text style={styles.statValue}>{orders}</Text>
                  </View>
                  <View style={{ marginLeft: rw(10) }}>
                    <Text style={styles.statLabel}>Revenue</Text>
                    <Text style={styles.statValue}>
                      Rs. {revenue.toLocaleString()}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Chart */}
              <BarChartComponent chartData={chartData} />
            </>
          )}
        </View>
        <OperationHealthComponent summary={summary} />
      </ScrollView>
      {menuOpen && (
        <View style={styles.menuContainer} pointerEvents="box-none">
          <TouchableWithoutFeedback onPress={() => setMenuOpen(false)}>
            <View style={styles.menuOverlay} />
          </TouchableWithoutFeedback>
          <View style={[styles.dropdown, { top: 60, right: 16 }]}>
            <TouchableWithoutFeedback
              onPress={() => {
                setMenuOpen(false);
                logout();
              }}
            >
              <View>
                <Text style={[styles.dropdownItem, { color: COLORS.primary }]}>
                  Logout
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  topSafeArea: {
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background, // White main background
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdown: {
    position: 'absolute',
    top: 50,
    right: 0,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    minWidth: 140,
    zIndex: 1000,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontFamily: FONTS.semiBold600,
    fontSize: FONT_SIZE.normal,
  },
  profileText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: FONT_SIZE.xSmall,
    fontFamily: FONTS.semiBold600,
  },

  filterRow: { flexDirection: 'row', marginVertical: 12, flexWrap: 'wrap' },
  filterBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 8,
    marginBottom: 8,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.borderGray,
  },
  cardDesc: {
    fontSize: FONT_SIZE.small,
    fontFamily: FONTS.semiBold600,
    fontWeight: '600',
    color: COLORS.grayText,
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statLabel: {
    fontSize: FONT_SIZE.xSmall,
    fontFamily: FONTS.semiBold600,
    fontWeight: '600',
    color: COLORS.grayText1,
  },
  statValue: {
    fontSize: FONT_SIZE.medium,
    fontFamily: FONTS.extrabold800,
    color: COLORS.primary,
    fontWeight: '800',
    marginTop: 4,
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1000,
  },
  menuOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'transparent',
    zIndex: 999,
  },
});
