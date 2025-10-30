import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderComponent from '../../components/HeaderComponent';
import AppButton from '../../components/AppButton';
import { COLORS, FONTS } from '../../constants';
import { FONT_SIZE, SPACING, BORDER_RADIUS } from '../../utils/spacing';
import { useRoute } from '@react-navigation/native';
import {
  fetchOrderDetail,
  acceptOrder,
  rejectOrder,
  markOrderReady,
} from '../../services/DashboardService';

// Fetches and renders order details
export default function OrderDetail() {
  const route = useRoute();
  const orderId = route?.params?.id;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [order, setOrder] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  const isMountedRef = useRef(true);

  const loadOrder = useCallback(
    async (showSpinner = false) => {
      if (!orderId) return;
      try {
        if (showSpinner) setLoading(true);
        setError('');
        const res = await fetchOrderDetail(orderId);
        if (!isMountedRef.current) return;
        const normalized = normalizeOrderResponse(res);

        if (!normalized) {
          setOrder(null);
          setError('Order not found');
          return;
        }

        setOrder(normalized);
      } catch (e) {
        if (!isMountedRef.current) return;
        setError(e?.message || 'Failed to fetch order');
      } finally {
        if (showSpinner && isMountedRef.current) {
          setLoading(false);
        }
      }
    },
    [orderId],
  );

  useEffect(() => {
    isMountedRef.current = true;
    loadOrder(true);
    return () => {
      isMountedRef.current = false;
    };
  }, [loadOrder]);

  const handleAccept = useCallback(async () => {
    if (!orderId) return;
    try {
      setActionLoading('accept');
      await acceptOrder(orderId);
      if (!isMountedRef.current) return;
      await loadOrder();
      Alert.alert('Order accepted', 'You have accepted this order.');
    } catch (err) {
      if (!isMountedRef.current) return;
      Alert.alert(
        'Failed to accept order',
        err?.message || 'Please try again in a moment.',
      );
    } finally {
      if (isMountedRef.current) {
        setActionLoading(null);
      }
    }
  }, [orderId, loadOrder]);

  const handleReject = useCallback(async () => {
    if (!orderId) return;
    try {
      setActionLoading('reject');
      await rejectOrder(orderId);
      if (!isMountedRef.current) return;
      await loadOrder();
      Alert.alert('Order rejected', 'The order has been rejected.');
    } catch (err) {
      if (!isMountedRef.current) return;
      Alert.alert(
        'Failed to reject order',
        err?.message || 'Please try again in a moment.',
      );
    } finally {
      if (isMountedRef.current) {
        setActionLoading(null);
      }
    }
  }, [orderId, loadOrder]);

  const handleManualReject = useCallback(() => {
    handleReject();
  }, [handleReject]);

  const handleMarkReady = useCallback(async () => {
    if (!orderId) return;
    try {
      setActionLoading('ready');
      await markOrderReady(orderId);
      if (!isMountedRef.current) return;
      await loadOrder();
      Alert.alert(
        'Marked ready',
        'This order is now marked as ready for delivery.',
      );
    } catch (err) {
      if (!isMountedRef.current) return;
      Alert.alert(
        'Failed to mark ready',
        err?.message || 'Please try again in a moment.',
      );
    } finally {
      if (isMountedRef.current) {
        setActionLoading(null);
      }
    }
  }, [orderId, loadOrder]);

  const statusKey = useMemo(
    () => normalizeStatus(order?.status),
    [order?.status],
  );
  const isPending = statusKey === 'pending';

  // Auto-decline timer functionality removed per requirements

  const isActionBusy = actionLoading !== null;

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
            {isPending ? (
              <>
                {/* Auto-decline countdown removed */}
                <View style={styles.actionsContainer}>
                  <ActionButton
                    label="Reject"
                    variant="danger"
                    onPress={handleManualReject}
                    loading={actionLoading === 'reject'}
                    disabled={loading || isActionBusy}
                  />
                  <ActionButton
                    label="Accept"
                    onPress={handleAccept}
                    loading={actionLoading === 'accept'}
                    disabled={loading || isActionBusy}
                  />
                  <ActionButton
                    label="Ready for Delivery"
                    variant="outline"
                    onPress={handleMarkReady}
                    loading={actionLoading === 'ready'}
                    disabled={loading || isActionBusy}
                  />
                </View>
              </>
            ) : (
              <AppButton
                title="Ready for Delivery"
                onPress={handleMarkReady}
                style={{ marginTop: SPACING.large }}
              />
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

function ActionButton({
  label,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
}) {
  const isDisabled = disabled || loading;

  const backgroundColor =
    variant === 'danger'
      ? COLORS.red
      : variant === 'outline'
      ? COLORS.white
      : COLORS.primary;
  const borderColor =
    variant === 'danger'
      ? COLORS.red
      : variant === 'outline'
      ? COLORS.primary
      : backgroundColor;
  const textColor = variant === 'outline' ? COLORS.primary : COLORS.white;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[
        styles.actionButton,
        { backgroundColor, borderColor },
        isDisabled && styles.actionButtonDisabled,
      ]}
      disabled={isDisabled}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' ? COLORS.primary : COLORS.white}
        />
      ) : (
        <Text style={[styles.actionButtonText, { color: textColor }]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}

function extractAddressText(order) {
  if (!order) return '-';

  if (typeof order?.address === 'string') {
    const trimmed = order.address.trim();
    if (trimmed) return trimmed;
  }

  const directString =
    (typeof order?.address?.full_address === 'string'
      ? order.address.full_address.trim()
      : '') ||
    (typeof order?.delivery_address === 'string'
      ? order.delivery_address.trim()
      : '') ||
    (typeof order?.address_line === 'string'
      ? order.address_line.trim()
      : '') ||
    (typeof order?.address?.address_line === 'string'
      ? order.address.address_line.trim()
      : '');

  if (directString) return directString;

  const addressObject =
    order?.address && typeof order.address === 'object' ? order.address : null;

  if (addressObject) {
    const parts = [
      addressObject.address_line,
      addressObject.city,
      addressObject.state,
      addressObject.postal_code,
    ]
      .map(part => (typeof part === 'string' ? part.trim() : ''))
      .filter(Boolean);

    if (parts.length) {
      return parts.join(', ');
    }
  }

  const fallbackParts = [
    typeof order.address_line === 'string' ? order.address_line.trim() : '',
    typeof order.city === 'string' ? order.city.trim() : '',
    typeof order.state === 'string' ? order.state.trim() : '',
    typeof order.postal_code === 'string' ? order.postal_code.trim() : '',
  ].filter(Boolean);

  if (fallbackParts.length) {
    return fallbackParts.join(', ');
  }

  return '-';
}

function normalizeOrderResponse(rawResponse) {
  const parsed =
    rawResponse?.data?.order ||
    rawResponse?.data ||
    rawResponse?.order ||
    rawResponse ||
    null;

  if (!parsed) return null;

  const items = Array.isArray(parsed?.items)
    ? parsed.items
    : Array.isArray(parsed?.order_items)
    ? parsed.order_items
    : [];

  return {
    id: parsed.id,
    orderNumber: parsed.order_number,
    status: parsed.status,
    createdAt: parsed.created_at,
    customerName: parsed?.user?.name || parsed?.customer_name || '-',
    addressText: extractAddressText(parsed) || '-',
    paymentMethod: String(parsed?.payment_method || '')
      .toUpperCase()
      .trim(),
    items,
    subtotal: Number(parsed?.subtotal || 0),
    deliveryFee: Number(parsed?.delivery_fee || 0),
    totalAmount: Number(parsed?.total_amount || 0),
  };
}

function normalizeStatus(value) {
  return String(value || '')
    .trim()
    .toLowerCase();
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
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: SPACING.large,
    marginHorizontal: -6,
  },
  actionButton: {
    flexGrow: 1,
    flexBasis: '30%',
    marginHorizontal: 6,
    marginBottom: 12,
    paddingVertical: 14,
    borderRadius: BORDER_RADIUS.xlarge,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  actionButtonText: {
    fontFamily: FONTS.bold700,
    fontWeight: '700',
    fontSize: FONT_SIZE.medium,
    color: COLORS.white,
  },
  actionButtonDisabled: {
    opacity: 0.6,
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
