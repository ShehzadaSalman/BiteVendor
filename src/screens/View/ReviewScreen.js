import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS, FONTS } from '../../constants';
import { FONT_SIZE } from '../../utils/spacing';
import HeaderComponent from '../../components/HeaderComponent';
import CustomTitle from '../../components/CustomTitle';
import starIcon from '../../assets/images/Review/star.png';
import emptyStarIcon from '../../assets/images/Review/emptyStar.png'; // optional, for empty stars

//import { COLORS, FONTS } from 'constants';
//import { FONT_SIZE, rh } from 'utils/spacing';

const reviews = [
  {
    id: '1',
    rating: 4,
    date: '8/15/2025',
    time: '11:30 AM',
    text: 'This pizza is an explosion of flavor in every bite! The tender chunks of smoky, perfectly spiced chicken tikka are layered generously over a bed of gooey mozzarella and creamy tikka sauce. The crust is soft on the inside with just the right crunch on the outside — like naan meets pizza.',
  },
  {
    id: '2',
    rating: 4,
    date: '8/15/2025',
    time: '11:30 AM',
    text: 'This pizza is an explosion of flavor in every bite! The tender chunks of smoky, perfectly spiced chicken tikka are layered generously over a bed of gooey mozzarella and creamy tikka sauce. The crust is soft on the inside with just the right crunch on the outside — like naan meets pizza.',
  },
];

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
  const filters = ['Custom', 'Last week', 'Last month'];

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent
        title=""
        leftIcon="chevron"
        rightIcon={require('../../assets/images/Header/notification.png')}
      />
      <CustomTitle variant="title">Review</CustomTitle>
      {/* Rating Summary */}
      <Text style={styles.mainRating}>4.0</Text>
      <Stars rating={5} />
      <Text style={styles.reviewCount}>300 Reviews</Text>
      {/* Progress Bars */}
      {[
        { stars: 5, count: 222 },
        { stars: 4, count: 200 },
        { stars: 3, count: 50 },
        { stars: 2, count: 30 },
        { stars: 1, count: 10 },
      ].map(({ stars, count }) => (
        <View key={stars} style={{ flex: 1 }}>
          <View style={styles.row}>
            <Text style={styles.starLabel}>{stars}</Text>
            <Image source={starIcon} style={styles.star} />
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { flex: count / 222 }, // proportional fill
                ]}
              />
              <View style={{ flex: 1 - count / 222 }} />
            </View>
          </View>
          <Text style={styles.count}>({count})</Text>
        </View>
      ))}
      {/* Filter Chips */}
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
      {/* Reviews List */}
      <FlatList
        data={reviews}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.reviewCard}>
            <View style={[styles.row, { justifyContent: 'space-between' }]}>
              <Stars rating={4} />
              <Text style={styles.date}>
                {item.date} {'\n'}
                {item.time}
              </Text>
            </View>
            <Text style={styles.reviewText}>{item.text}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
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
    marginLeft: 8,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  progressFill: {
    backgroundColor: COLORS.primary,
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
