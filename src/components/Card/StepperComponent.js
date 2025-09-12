import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS, FONTS } from '../../constants'; // adjust path
import { FONT_SIZE } from '../../utils/spacing';

export default function StepperComponent() {
  return (
    <View style={styles.stepperWrapper}>
      {/* Horizontal line */}
      <Image
        source={require('../../assets/images/Cart/vLine.png')}
        style={styles.stepLine}
      />

      {/* Steps positioned on top of the line */}
      <View style={styles.stepItemsRow}>
        <View style={styles.stepItem}>
          <Image
            source={require('../../assets/images/Cart/bg.png')}
            style={styles.stepCircle}
          />
          <Text style={styles.stepNumber}>1</Text>
          <Text style={styles.stepLabel}>Menu</Text>
        </View>

        <View style={styles.stepItem}>
          <Image
            source={require('../../assets/images/Cart/bg.png')}
            style={styles.stepCircle}
          />
          <Text style={styles.stepNumber}>2</Text>
          <Text style={styles.stepLabel}>Cart</Text>
        </View>

        <View style={styles.stepItem}>
          <Image
            source={require('../../assets/images/Cart/bg.png')}
            style={styles.stepCircle}
          />
          <Text style={styles.stepNumber}>3</Text>
          <Text style={styles.stepLabel}>Checkout</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stepperWrapper: {
    height: 90, // enough height to hold line & circles
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },

  stepLine: {
    position: 'absolute',
    top: '50%',
    //left: 20,
    //right: 20,
    height: 5,
    resizeMode: 'stretch',
  },

  stepItemsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },

  stepItem: {
    alignItems: 'center',
  },

  stepCircle: {
    width: 35,
    height: 35,
    position: 'absolute',
    top: 18, // adjust to center circle on line
  },

  stepNumber: {
    color: COLORS.white,
    fontFamily: FONTS.bold700,
    fontSize: FONT_SIZE.large,
    fontWeight: 'bold',
    position: 'absolute',
    top: 25,
    zIndex: 1, // keep number above circle
  },

  stepLabel: {
    fontFamily: FONTS.bold700,
    fontSize: FONT_SIZE.xSmall,
    fontWeight: 'bold',
    marginTop: 55, // pushes label below circle/line
    textAlign: 'center',
  },
});
