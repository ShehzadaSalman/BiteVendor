import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS, FONTS } from '../../constants'; // adjust path
import { FONT_SIZE } from '../../utils/spacing';

export default function DeliveryStepperComponent() {
  return (
    <View style={styles.stepperWrapper}>
      {/* Horizontal line */}

      {/* Steps positioned on top of the line */}
      <View style={styles.stepItemsRow}>
        <View style={styles.stepItem}>
          <Image source={require('../../assets/images/Cart/orderNoted.png')} />
          <Image
            source={require('../../assets/images/Cart/dotedLines.png')}
            style={styles.stepLine}
          />
        </View>

        <View style={styles.stepItem}>
          <Image
            source={require('../../assets/images/Cart/orderPrepared.png')}
          />
          <Image
            source={require('../../assets/images/Cart/dotedLines.png')}
            style={styles.stepLine}
          />
        </View>

        <View style={styles.stepItem}>
          <Image source={require('../../assets/images/Cart/ride.png')} />
          <Image
            source={require('../../assets/images/Cart/dotedLines.png')}
            style={styles.stepLine}
          />
        </View>
        <View style={styles.stepItem}>
          <Image
            source={require('../../assets/images/Cart/delivered.png')}
            style={styles.stepCircle}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stepperWrapper: {
    height: 50, // enough height to hold line & circles
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },

  stepLine: {
    height: 3,
    width: 60,
    resizeMode: 'contain',
    marginLeft: 10,
  },

  stepItemsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    // paddingHorizontal: 20,
  },

  stepItem: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  stepCircle: {
    // width: 35,
    // height: 35,
    // position: 'absolute',
    //top: -15,
    //left: -20, // adjust to center circle on line
  },
});
