import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Linking,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import axios from 'axios';

import HeaderComponent from '../../components/HeaderComponent';
import { COLORS, FONTS } from '../../constants';
import { BORDER_RADIUS, FONT_SIZE, SPACING } from '../../utils/spacing';

const BRANCHES_URL = 'https://development.bite.com.pk/api/vendor/branches';

const formatTime = timeString => {
  if (!timeString || typeof timeString !== 'string') {
    return '—';
  }
  const trimmed = timeString.trim();
  if (trimmed.length >= 5) {
    return trimmed.slice(0, 5);
  }
  return trimmed;
};

const BranchCard = ({ branch, onPressCall }) => {
  const hasPrepTime = Number.isFinite(Number(branch?.prep_time));

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.branchName}>{branch?.name || 'Unnamed branch'}</Text>
        <Text style={styles.branchLocation}>{branch?.location || '—'}</Text>
      </View>

      {branch?.address ? (
        <View style={styles.section}>
          <Text style={styles.label}>Address</Text>
          <Text style={styles.value}>{branch.address}</Text>
        </View>
      ) : null}

      <View style={[styles.section, styles.infoRow]}>
        <View style={styles.badge}>
          <Text style={styles.badgeLabel}>Opens</Text>
          <Text style={styles.badgeValue}>{formatTime(branch?.opening_time)}</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeLabel}>Closes</Text>
          <Text style={styles.badgeValue}>{formatTime(branch?.closing_time)}</Text>
        </View>
        {hasPrepTime ? (
          <View style={styles.badge}>
            <Text style={styles.badgeLabel}>Prep</Text>
            <Text style={styles.badgeValue}>{Number(branch.prep_time)} min</Text>
          </View>
        ) : null}
      </View>

      {branch?.phone ? (
        <TouchableOpacity
          activeOpacity={0.85}
          style={[styles.actionButton, styles.callButton]}
          onPress={() => onPressCall?.(branch.phone)}
        >
          <Text style={styles.actionText}>Call {branch.phone}</Text>
        </TouchableOpacity>
      ) : null}

    </View>
  );
};

export default function OutletsScreen() {
  const token = useSelector(state => state?.auth?.user?.token);

  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const fetchBranches = useCallback(
    async ({ isRefresh = false } = {}) => {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      try {
        setError('');
        const config = { timeout: 15000 };
        if (token) {
          config.headers = { Authorization: `Bearer ${token}` };
        }

        const response = await axios.get(BRANCHES_URL, config);
        const list = Array.isArray(response?.data?.data)
          ? response.data.data
          : [];
        setBranches(list);
      } catch (err) {
        const message =
          err?.response?.data?.message || err?.message || 'Failed to load branches';
        setError(message);
      } finally {
        if (isRefresh) {
          setRefreshing(false);
        } else {
          setLoading(false);
        }
      }
    },
    [token],
  );

  useEffect(() => {
    fetchBranches();
  }, [fetchBranches]);

  const handleCall = async phone => {
    const normalized = phone?.replace(/[^\d+]/g, '');
    if (!normalized) {
      return;
    }
    const url = `tel:${normalized}`;
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      }
    } catch (err) {
      console.warn('Unable to initiate call', err);
    }
  };

  const renderBranch = ({ item }) => (
    <BranchCard branch={item} onPressCall={handleCall} />
  );

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.centeredText}>Loading branches…</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centered}>
          <Text style={styles.errorTitle}>Unable to load branches</Text>
          <Text style={styles.errorMessage}>{error}</Text>
          <TouchableOpacity
            style={[styles.actionButton, styles.retryButton]}
            activeOpacity={0.85}
            onPress={() => fetchBranches()}
          >
            <Text style={styles.retryButtonText}>Try again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (!branches.length) {
      return (
        <View style={styles.centered}>
          <Text style={styles.emptyTitle}>No branches yet</Text>
          <Text style={styles.emptyMessage}>
            Once your vendor profile has active branches, they will appear here.
          </Text>
          <TouchableOpacity
            style={[styles.actionButton, styles.retryButton]}
            activeOpacity={0.85}
            onPress={() => fetchBranches()}
          >
            <Text style={styles.retryButtonText}>Refresh</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <FlatList
        data={branches}
        renderItem={renderBranch}
        keyExtractor={(item, index) =>
          String(item?.id ?? item?.slug ?? index)
        }
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => fetchBranches({ isRefresh: true })}
            tintColor={COLORS.primary}
            colors={[COLORS.primary]}
          />
        }
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderComponent
        title="Branches"
        leftIcon="chevron"
        bottomBorder
        isCircle
        rightIcon={require('../../assets/images/Header/notification.png')}
      />
      <View style={styles.container}>{renderContent()}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.small,
  },
  container: {
    flex: 1,
    paddingVertical: SPACING.small,
  },
  listContent: {
    paddingBottom: SPACING.large,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.medium,
    marginBottom: SPACING.small,
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.tiny,
  },
  branchName: {
    flex: 1,
    fontFamily: FONTS.bold700,
    fontWeight: 'bold',
    fontSize: FONT_SIZE.large,
    color: COLORS.text,
    marginRight: SPACING.tiny,
  },
  branchLocation: {
    fontFamily: FONTS.medium500,
    fontSize: FONT_SIZE.normal,
    color: COLORS.grayText1,
  },
  section: {
    marginTop: SPACING.tiny,
  },
  label: {
    fontFamily: FONTS.semiBold600,
    fontWeight: '600',
    fontSize: FONT_SIZE.small,
    color: COLORS.grayText1,
    marginBottom: 2,
  },
  value: {
    fontFamily: FONTS.medium500,
    fontSize: FONT_SIZE.normal,
    color: COLORS.text,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SPACING.small,
  },
  badge: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.normal,
    paddingVertical: SPACING.tiny,
    paddingHorizontal: SPACING.small,
    marginRight: SPACING.tiny,
  },
  badgeLabel: {
    fontFamily: FONTS.medium500,
    fontSize: FONT_SIZE.small,
    color: COLORS.grayText1,
  },
  badgeValue: {
    fontFamily: FONTS.bold700,
    fontWeight: 'bold',
    fontSize: FONT_SIZE.normal,
    color: COLORS.text,
  },
  actionButton: {
    marginTop: SPACING.tiny,
    borderRadius: BORDER_RADIUS.normal,
    paddingVertical: SPACING.small,
    alignItems: 'center',
    justifyContent: 'center',
  },
  callButton: {
    backgroundColor: COLORS.primary,
  },
  mapButton: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  actionText: {
    fontFamily: FONTS.semiBold600,
    fontWeight: '600',
    fontSize: FONT_SIZE.normal,
    color: COLORS.white,
  },
  mapButtonText: {
    color: COLORS.primary,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.large,
  },
  centeredText: {
    marginTop: SPACING.tiny,
    fontFamily: FONTS.medium500,
    fontSize: FONT_SIZE.normal,
    color: COLORS.grayText1,
  },
  errorTitle: {
    fontFamily: FONTS.bold700,
    fontWeight: 'bold',
    fontSize: FONT_SIZE.large,
    color: COLORS.text,
    marginBottom: SPACING.tiny,
    textAlign: 'center',
  },
  errorMessage: {
    fontFamily: FONTS.medium500,
    fontSize: FONT_SIZE.normal,
    color: COLORS.grayText1,
    textAlign: 'center',
    marginBottom: SPACING.small,
  },
  emptyTitle: {
    fontFamily: FONTS.bold700,
    fontWeight: 'bold',
    fontSize: FONT_SIZE.large,
    color: COLORS.text,
    marginBottom: SPACING.tiny,
  },
  emptyMessage: {
    fontFamily: FONTS.medium500,
    fontSize: FONT_SIZE.normal,
    color: COLORS.grayText1,
    textAlign: 'center',
    marginBottom: SPACING.small,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.large,
  },
  retryButtonText: {
    fontFamily: FONTS.semiBold600,
    fontWeight: '600',
    fontSize: FONT_SIZE.normal,
    color: COLORS.white,
  },
});
