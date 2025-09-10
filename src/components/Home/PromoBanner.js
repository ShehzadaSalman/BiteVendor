import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { rh, rw } from '../../utils/spacing';

export default function PromoBanner() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/Home/homeImage.png')} // update path
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: rh(-1.1),
  },
  image: {
    width: rw(100),
  },
});
