import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderComponent from '../../components/HeaderComponent';
import AppButton from '../../components/AppButton';
import { COLORS, FONTS } from '../../constants';
import { FONT_SIZE, SPACING, BORDER_RADIUS } from '../../utils/spacing';
import { useRoute } from '@react-navigation/native';
import { fetchOrderDetail } from '../../services/DashboardService';

// Fetches and renders order details
export default function OrderDetail() {
  const route = useRoute();
  const orderId = route?.params?.id;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [order, setOrder] = useState(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await fetchOrderDetail(orderId);
        if (!mounted) return;
        // Tolerant parsing for various response shapes
        const parsed =
          res?.data?.order || res?.data || res?.order || res || null;

        // Normalize to UI shape
        const normalized = parsed
          ? {
              id: parsed.id,
              orderNumber: parsed.order_number,
              status: parsed.status,
              createdAt: parsed.created_at,
              customerName: parsed?.user?.name || parsed?.customer_name || '-',
              addressText:
                parsed?.address?.full_address ||
                parsed?.delivery_address ||
                parsed?.address ||
                '-',
              paymentMethod: String(parsed?.payment_method || '')
                .toUpperCase()
                .trim(),
              items: parsed?.items || parsed?.order_items || [],
              subtotal: Number(parsed?.subtotal || 0),
              deliveryFee: Number(parsed?.delivery_fee || 0),
              totalAmount: Number(parsed?.total_amount || 0),
              autoDeclineTimer: parsed?.auto_decline_timer,
            }
          : null;
        setOrder(normalized);
      } catch (e) {
        if (!mounted) return;
        setError(e?.message || 'Failed to fetch order');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [orderId]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerWrap}>
        <HeaderComponent title="Order detail" isCircle leftIcon="chevron" />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {loading && (
          <View style={styles.loadingBox}>
            <ActivityIndicator color={COLORS.primary} />
          </View>
        )}
        {!!error && !loading && <Text style={styles.errorText}>{error}</Text>}
        {!loading && !error && order && (
          <>
            {/* Order heading */}
            <View style={styles.rowBetween}>
              <View>
                <Text style={styles.orderId}>
                  #{String(order?.orderNumber || '')}
                </Text>
                <Text style={styles.orderMeta}>
                  {formatDate(order?.createdAt)}
                </Text>
                <Text style={styles.orderMeta}>
                  {formatTime(order?.createdAt)}
                </Text>
              </View>
              <View style={[styles.badge, styles.badgeActive]}>
                <Text style={styles.badgeText}>
                  {String(order?.status || '')}
                </Text>
              </View>
            </View>

            {/* Key details */}
            <View style={styles.card}>
              <DetailRow
                label="Customer Name"
                value={order?.customerName || '-'}
              />
              <DetailRow label="Address" value={order?.addressText || '-'} />
              <DetailRow
                label="Payment Method"
                value={order?.paymentMethod || '-'}
              />
            </View>

            {/* Items */}
            <View style={styles.card}>
              {(order?.items || []).map((it, idx) => {
                const name =
                  it?.name || it?.item_name || it?.menu_item?.name || '-';
                const addons = it?.addons || it?.add_ons || [];
                const variations = it?.variations || it?.options || [];
                return (
                  <View key={idx} style={styles.itemBlock}>
                    <View style={styles.itemRow}>
                      <Text style={styles.itemLabel}>Item</Text>
                      <Text style={styles.itemValue}>{name}</Text>
                    </View>
                    {!!addons?.length && (
                      <View style={styles.itemRow}>
                        <Text style={styles.itemLabel}>Add ons</Text>
                        <Text style={styles.itemValue}>
                          {addons.join(', ')}
                        </Text>
                      </View>
                    )}
                    {!!variations?.length && (
                      <View style={styles.itemRow}>
                        <Text style={styles.itemLabel}>Variations</Text>
                        <Text style={styles.itemValue}>
                          {variations.join(', ')}
                        </Text>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>

            {/* Price summary */}
            <View style={styles.totalsCard}>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Subtotal</Text>
                <Text style={styles.totalLabel}>
                  Rs . {Number(order?.subtotal || 0)}
                </Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Delivery Charges</Text>
                <Text style={styles.totalLabel}>
                  Rs . {Number(order?.deliveryFee || 0)}
                </Text>
              </View>
              <View style={[styles.totalRow, styles.totalDivider]} />
              <View style={styles.totalRow}>
                <Text style={styles.totalTitle}>Total</Text>
                <Text style={styles.totalTitle}>
                  Rs . {Number(order?.totalAmount || 0)}
                </Text>
              </View>
            </View>

            {/* Primary action */}
            <AppButton
              title="Ready for Delivery"
              onPress={() => {}}
              style={{ marginTop: SPACING.large }}
            />

            {/* Remaining time pill only when pending */}
            {order?.status === 'pending' && !!order?.autoDeclineTimer && (
              <View style={styles.remainingPill}>
                <Text style={styles.remainingText}>
                  Remaining Time : {order.autoDeclineTimer}
                </Text>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function DetailRow({ label, value }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

function formatDate(iso) {
  const d = iso ? new Date(iso) : null;
  if (!d) return '-';
  return d.toLocaleDateString(undefined, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

function formatTime(iso) {
  const d = iso ? new Date(iso) : null;
  if (!d) return '-';
  return d.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    padding: 16,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  orderId: {
    fontFamily: FONTS.bold700,
    fontWeight: '700',
    fontSize: FONT_SIZE.xlarge,
    color: COLORS.black,
  },
  orderMeta: {
    fontFamily: FONTS.medium500,
    fontWeight: '500',
    fontSize: FONT_SIZE.normal,
    color: COLORS.grayText,
  },
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  badgeActive: {
    backgroundColor: COLORS.lightGreen,
  },
  badgeText: {
    fontFamily: FONTS.bold700,
    fontWeight: '700',
    fontSize: FONT_SIZE.normal,
    color: COLORS.primary,
  },
  card: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.gray,
    paddingVertical: 12,
    marginTop: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  detailLabel: {
    fontFamily: FONTS.bold700,
    fontWeight: '700',
    fontSize: FONT_SIZE.medium,
    color: COLORS.black,
  },
  detailValue: {
    fontFamily: FONTS.medium500,
    fontWeight: '500',
    fontSize: FONT_SIZE.medium,
    color: COLORS.grayText1,
  },
  itemBlock: {
    gap: 8,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  itemLabel: {
    fontFamily: FONTS.bold700,
    fontWeight: '700',
    fontSize: FONT_SIZE.large,
    color: COLORS.black,
  },
  itemValue: {
    fontFamily: FONTS.medium500,
    fontWeight: '500',
    fontSize: FONT_SIZE.large,
    color: COLORS.black,
  },
  totalsCard: {
    marginTop: 12,
    paddingVertical: 8,
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  totalLabel: {
    fontFamily: FONTS.medium500,
    fontWeight: '500',
    fontSize: FONT_SIZE.large,
    color: COLORS.black,
  },
  totalTitle: {
    fontFamily: FONTS.bold700,
    fontWeight: '700',
    fontSize: FONT_SIZE.xlarge,
    color: COLORS.black,
  },
  totalDivider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    marginVertical: 8,
  },
  remainingPill: {
    marginTop: SPACING.large,
    backgroundColor: '#F63F3A',
    paddingVertical: 14,
    borderRadius: BORDER_RADIUS.xlarge,
    alignItems: 'center',
  },
  remainingText: {
    fontFamily: FONTS.bold700,
    fontWeight: '700',
    color: COLORS.white,
    fontSize: FONT_SIZE.large,
  },
  loadingBox: {
    paddingTop: 40,
    alignItems: 'center',
  },
  errorText: {
    color: COLORS.red,
    marginTop: 8,
  },
  headerWrap: {
    paddingHorizontal: 16,
  },
});
