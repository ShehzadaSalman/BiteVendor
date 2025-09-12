import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { COLORS, FONTS } from '../../constants';
import { BORDER_RADIUS, FONT_SIZE, rh } from '../../utils/spacing';
export default function OftenOderedComponent() {
  const suggestedItems = [
    require('../../assets/images/Cart/w.png'),
    require('../../assets/images/Cart/7up.png'),
    require('../../assets/images/Cart/sauce.png'),
    require('../../assets/images/Cart/coke.png'),
  ];
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Often ordered with</Text>
      <Text style={styles.sectionSub}>People usually add these items</Text>
      <FlatList
        data={suggestedItems}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.suggestionCard}>
            <Image source={item} style={styles.suggestionImage} />
            <TouchableOpacity style={styles.suggestionAddBtn}>
              <Image source={require('../../assets/images/Cart/add.png')} />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingVertical: 16,
    paddingLeft: 16,
    borderBottomColor: COLORS.gray,
    borderBottomWidth: rh(0.8),
  },
  sectionTitle: {
    fontSize: FONT_SIZE.medium,
    fontFamily: FONTS.bold700,
    marginBottom: 6,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  sectionSub: {
    fontSize: FONT_SIZE.small,
    fontFamily: FONTS.medium500,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 10,
  },
  suggestionCard: {
    width: 120,
    height: 100,
    flexDirection: 'row',
    borderColor: COLORS.secondary,
    borderWidth: 1,
    borderRadius: 11,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  suggestionImage: { width: 80, height: 80, marginBottom: 10 },
  suggestionAddBtn: {
    borderColor: COLORS.secondary,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.xtiny,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
});
