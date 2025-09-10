import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../utils/layout';
//import FastImage from 'react-native-fast-image';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/SplashScreen.gif')} // Replace with correct path
        style={styles.gif}
        //resizeMode={FastImage.resizeMode.cover}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // optional
    justifyContent: 'center',
    alignItems: 'center',
  },
  gif: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    //resizeMode: 'cover',
  },
});
