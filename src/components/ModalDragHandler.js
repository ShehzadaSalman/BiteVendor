import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function ModalDragHandler() {
  return (
    <View style={styles.dragHandleContainer}>
      <View style={styles.dragHandle} />
    </View>
  );
}

const styles = StyleSheet.create({
  dragHandleContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  dragHandle: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#ccc',
  },
});
