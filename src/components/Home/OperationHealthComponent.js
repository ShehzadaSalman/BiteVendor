import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { FONTS } from '../../constants/fonts'; // adjust path as needed
import { COLORS } from '../../constants';
import { BORDER_RADIUS, FONT_SIZE } from '../../utils/spacing';
import InfoBadge from '../InfoBadge';

export default function OperationHealthComponent() {
  const topCards = [
    {
      id: 1,
      title: 'Offline outlets',
      value: 4,
      icon: require('../../assets/images/overview/offline.png'),
    },
    {
      id: 2,
      title: 'Cancelled orders',
      value: 7,
      icon: require('../../assets/images/overview/cancel.png'),
    },
    {
      id: 3,
      title: 'Delayed orders',
      value: 4,
      icon: require('../../assets/images/overview/delay.png'),
    },
    {
      id: 4,
      title: '1- star ratings',
      value: 1,
      icon: require('../../assets/images/overview/sad.png'),
    },
    {
      id: 5,
      title: 'Inaccurate orders',
      value: 1,
      icon: require('../../assets/images/overview/bag.png'),
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      {/* Top Status Cards */}
      {topCards.map(item => (
        <View key={item.id} style={styles.card}>
          <Image source={item.icon} style={styles.icon} />
          <Text style={styles.label}>{item.title}</Text>
          <Text style={styles.value}>{item.value}</Text>
        </View>
      ))}

      {/* Operation Health */}
      <Text style={styles.sectionTitle}>Operation health</Text>
      <View style={styles.healthRow}>
        <View style={[styles.healthCard, { marginRight: 15 }]}>
          <Text style={styles.healthTitle}>Preparation time</Text>
          <Text style={styles.healthValue}>
            24 <Text style={styles.unit}>min</Text>
          </Text>
          <View style={styles.healthRow}>
            <InfoBadge text="1.24% ↑" />
            <Text style={styles.healthLabel}>Last 7 days</Text>
          </View>
        </View>

        <View style={styles.healthCard}>
          <Text style={styles.healthTitle}>Cancelations</Text>
          <Text style={styles.healthValue}>
            05 <Text style={styles.unit}>cancel</Text>
          </Text>
          <View style={styles.healthRow}>
            <InfoBadge text="1.24% ↑" />
            <Text style={styles.healthLabel}>Last 7 days</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingVertical: 22,
    //padding: 16,
  },
  card: {
    height: 75,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    borderRadius: BORDER_RADIUS.tiny,
    paddingHorizontal: 18,
    marginBottom: 12,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 10,
  },
  label: {
    flex: 1,
    fontFamily: FONTS.semiBold600,
    fontWeight: '600',
    fontSize: FONT_SIZE.medium,
    color: COLORS.black,
  },
  value: {
    fontFamily: FONTS.semiBold600,
    fontWeight: '600',
    fontSize: FONT_SIZE.xlarge,
    color: COLORS.black,
  },
  sectionTitle: {
    fontFamily: FONTS.bold700,
    fontWeight: 'bold',
    fontSize: FONT_SIZE.large,
    marginVertical: 12,
    color: COLORS.black,
  },
  healthRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  healthCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    borderRadius: BORDER_RADIUS.tiny,
    padding: 14,
    //marginRight: 10,
  },
  healthValue: {
    fontFamily: FONTS.bold700,
    fontWeight: 'bold',
    fontSize: FONT_SIZE.xxlarge,
    color: COLORS.primary,
  },
  unit: {
    fontFamily: FONTS.bold700,
    fontSize: FONT_SIZE.xSmall,
    fontWeight: 'bold',
    color: COLORS.black,
  },

  healthLabel: {
    fontFamily: FONTS.bold700,
    fontWeight: 'bold',
    fontSize: FONT_SIZE.small,
    color: COLORS.grayText,
    marginTop: 4,
  },
  healthTitle: {
    fontFamily: FONTS.semiBold600,
    fontWeight: '600',
    fontSize: FONT_SIZE.xSmall,
    color: COLORS.black,
  },
});
