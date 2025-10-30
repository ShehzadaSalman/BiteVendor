import React, { useEffect, useMemo, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS, FONTS } from '../../constants';
import { FONT_SIZE } from '../../utils/spacing';
import HeaderComponent from '../../components/HeaderComponent';
import CustomTitle from '../../components/CustomTitle';
import starIcon from '../../assets/images/Review/star.png';
import emptyStarIcon from '../../assets/images/Review/emptyStar.png'; // optional, for empty stars
import { fetchReviews } from '../../services/DashboardService';

//import { COLORS, FONTS } from 'constants';
//import { FONT_SIZE, rh } from 'utils/spacing';

const formatDate = iso => {
  const d = iso ? new Date(iso) : null;
  if (!d) return '-';
  return d.toLocaleDateString(undefined, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

const formatTime = iso => {
  const d = iso ? new Date(iso) : null;
  if (!d) return '-';
  return d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
};

const Stars = ({ rating = 0, maxStars = 5 }) => {
  return (
    <View style={styles.starContainer}>
      {Array.from({ length: maxStars }).map((_, index) => (
        <Image
          key={index}
          source={index < rating ? starIcon : emptyStarIcon} // full or empty star
          style={styles.star}
        />
      ))}
    </View>
  );
};

const ReviewScreen = () => {
  // const filters = ['Custom', 'Last week', 'Last month'];
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [reviews, setReviews] = useState([]);

  const load = useCallback(async ({ isRefresh = false } = {}) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    try {
      setError('');
      const list = await fetchReviews();
      setReviews(Array.isArray(list) ? list : []);
    } catch (e) {
      setError(e?.message || 'Failed to load reviews');
    } finally {
      if (isRefresh) setRefreshing(false);
      else setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const averageRating = useMemo(() => {
    if (!reviews.length) return 0;
    const sum = reviews.reduce((acc, r) => acc + Number(r?.rating || 0), 0);
    return Number(sum / reviews.length).toFixed(1);
  }, [reviews]);

  const starBuckets = useMemo(() => {
    const buckets = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    reviews.forEach(r => {
      const rate = Math.round(Number(r?.rating || 0));
      if (rate >= 1 && rate <= 5) buckets[rate] += 1;
    });
    return buckets;
  }, [reviews]);

  const maxBucket = useMemo(() => {
    return Math.max(1, ...Object.values(starBuckets));
  }, [starBuckets]);

  const renderBars = () => (
    <>
      {[5, 4, 3, 2, 1].map(stars => {
        const count = starBuckets[stars] || 0;
        const percentage = (count / maxBucket) * 100;
        return (
          <View key={stars} style={{ marginVertical: 4 }}>
            <View style={styles.row}>
              <Text style={styles.starLabel}>{stars}</Text>
              <Image source={starIcon} style={styles.star} />
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${percentage}%` }]} />
              </View>
            </View>
            <Text style={styles.count}>({count})</Text>
          </View>
        );
      })}
    </>
  );

  const renderItem = ({ item }) => {
    const dateText = formatDate(item?.created_at);
    const timeText = formatTime(item?.created_at);
    const rating = Number(item?.rating || 0);
    const text = item?.comment || '';
    return (
      <View style={styles.reviewCard}>
        <View style={[styles.row, { justifyContent: 'space-between' }]}>
          <Stars rating={rating} />
          <Text style={styles.date}>
            {dateText} {'\n'}
            {timeText}
          </Text>
        </View>
        <Text style={styles.reviewText}>{text}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent
        title=""
        isCircle
        leftIcon="chevron"
        rightIcon={require('../../assets/images/Header/notification.png')}
      />
      <CustomTitle variant="title">Review</CustomTitle>
      {loading ? (
        <View style={{ paddingVertical: 20, alignItems: 'center' }}>
          <ActivityIndicator color={COLORS.primary} />
        </View>
      ) : null}

      {!loading && (
        <>
          {/* Rating Summary */}
          <Text style={styles.mainRating}>{averageRating}</Text>
          <Stars rating={Math.round(Number(averageRating))} />
          <Text style={styles.reviewCount}>{reviews.length} Reviews</Text>

          {/* Progress Bars */}
          {renderBars()}
        </>
      )}

      {/* Filter Chips - commented out */}
      {/**
      <View style={styles.row}>
        <View style={styles.imageContainer}>
          <Image source={require('../../assets/images/Review/Review.png')} />
        </View>
        <View style={styles.filterRow}>
          {filters.map(f => (
            <TouchableOpacity key={f} style={styles.filterChip}>
              <Text style={styles.filterText}>{f}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      */}
      {/* Reviews List */}
      {!loading && !error && (
        <FlatList
          data={reviews}
          keyExtractor={(item, index) => String(item?.id ?? item?.order_id ?? index)}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => load({ isRefresh: true })}
              tintColor={COLORS.primary}
              colors={[COLORS.primary]}
            />
          }
          ListEmptyComponent={
            <View style={{ paddingVertical: 20 }}>
              <Text style={styles.reviewCount}>No reviews yet</Text>
            </View>
          }
        />
      )}

      {!!error && !loading && (
        <View style={{ paddingVertical: 20, alignItems: 'center' }}>
          <Text style={{ color: COLORS.red, marginBottom: 10 }}>{error}</Text>
          <TouchableOpacity onPress={() => load()} style={styles.filterChip}>
            <Text style={styles.filterText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ReviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: 12,
    paddingHorizontal: 16,
  },
  mainRating: {
    fontFamily: FONTS.bold700,
    fontWeight: 'bold',
    fontSize: 52,
    textAlign: 'center',
  },
  reviewCount: {
    fontFamily: FONTS.semiBold600,
    fontSize: FONT_SIZE.large,
    textAlign: 'center',
    color: COLORS.grayText1,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starLabel: {
    fontFamily: FONTS.semiBold600,
    fontWeight: '600',
    fontSize: FONT_SIZE.large,
    color: COLORS.text,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: COLORS.borderGray,
    marginLeft: 6,
    borderRadius: 1,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 1,
  },

  count: {
    marginTop: -5,
    textAlign: 'right',
    fontFamily: FONTS.bold700,
    fontWeight: 'bold',
    fontSize: FONT_SIZE.xSmall,
    color: COLORS.primary,
  },
  filterRow: {
    flexDirection: 'row',
    marginRight: 16,
    marginVertical: 16,
    marginLeft: 5,
    justifyContent: 'flex-start',
  },
  filterChip: {
    borderWidth: 1,
    height: 27,
    borderColor: COLORS.borderGray,
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 14,
    marginRight: 5,
  },
  filterText: {
    fontFamily: FONTS.semiBold600,
    fontWeight: '600',
    fontSize: FONT_SIZE.xSmall,
    color: COLORS.black,
  },
  reviewCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    padding: 12,
    marginBottom: 16,
  },
  date: {
    fontFamily: FONTS.medium500,
    fontWeight: '500',
    alignSelf: 'flex-end',
    fontSize: FONT_SIZE.normal,
    color: COLORS.grayText1,
    marginBottom: 6,
  },
  reviewText: {
    marginTop: 5,
    fontFamily: FONTS.medium500,
    fontWeight: '500',
    fontSize: FONT_SIZE.xSmall,
    color: COLORS.black,
    lineHeight: 15,
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 3,
  },
  star: { marginRight: 4 },
  imageContainer: {
    borderWidth: 1,
    width: 30,
    height: 27,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.borderGray,
    borderRadius: 20,
  },
});
