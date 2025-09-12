import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Modal from 'react-native-modal';

import { COLORS } from '../../constants';
import PaymentMethodModalComponent from './PaymentMethodModalComponent';
import ModalDragHandler from '../ModalDragHandler';

export default function PaymentMethodBottomModal({
  visible,
  onClose,
  selectedMethod,
}) {
  return (
    <Modal
      isVisible={visible} // ✅ CORRECT PROP for react-native-modal
      onBackdropPress={onClose} // ✅ for closing when background is tapped
      onSwipeComplete={onClose}
      swipeDirection="down"
      backdropOpacity={0.3}
      style={styles.modal}
      propagateSwipe={true}
    >
      <View style={styles.modalContainer}>
        <ModalDragHandler />
        <PaymentMethodModalComponent title={selectedMethod} onClose={onClose} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0, // very important for full-width bottom modal
  },
  modalContainer: {
    backgroundColor: COLORS.background,
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '90%',
  },
});
