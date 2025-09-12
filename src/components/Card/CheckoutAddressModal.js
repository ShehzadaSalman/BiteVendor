import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { COLORS, FONTS } from '../../constants';
import { BORDER_RADIUS, FONT_SIZE } from '../../utils/spacing';
import CheckoutAddressesComponent from '../Address/CheckoutAddressesComponent';
import { SCREEN_WIDTH } from '../../utils/layout';
import AppButton from '../AppButton';

export default function CheckoutAddressModal({
  isVisible,
  onClose,
  addresses,
  setAddresses,
  selectedAddress,
  setSelectedAddress,
}) {
  const [editingId, setEditingId] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newAddress, setNewAddress] = useState({
    id: Date.now().toString(),
    title: '',
    subtitle: '',
  });

  const handleEditChange = (id, field, value) => {
    const updated = addresses.map(addr =>
      addr.id === id ? { ...addr, [field]: value } : addr,
    );
    setAddresses(updated);
  };

  const handleAddNew = () => {
    if (newAddress.title || newAddress.subtitle) {
      setAddresses([...addresses, newAddress]);
      setIsAddingNew(false);
      setNewAddress({
        id: Date.now().toString(),
        title: '',
        subtitle: '',
      });
    }
  };

  const handleApply = () => {
    handleAddNew();
    onClose();
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={styles.modal}
    >
      <View style={styles.container}>
        <CheckoutAddressesComponent
          onClose={onClose}
          addresses={addresses}
          setAddresses={setAddresses}
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
        />

        <View style={styles.buttonsContainer}>
          <AppButton
            title="Cancel"
            textColor={COLORS.primary}
            style={styles.btnContainer}
            onPress={() => onClose()}
          />
          <AppButton
            title="Apply"
            textColor={COLORS.primary}
            style={styles.btnContainer}
            onPress={() => onClose()}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: BORDER_RADIUS.normal,
    borderTopRightRadius: BORDER_RADIUS.normal,
    paddingHorizontal: 20,
  },

  btnContainer: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.normal,
    width: 180,
    marginVertical: 20,
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
