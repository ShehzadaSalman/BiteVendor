import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';
import PaymentMethodsComponent from '../../components/Card/PaymentMethodsComponent';
import PaymentMethodBottomModal from '../../components/Payment/PaymentMethodBottomModal';
import CustomTitle from '../CustomTitle';

export default function PaymentMethodComponent() {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <View style={styles.safeArea}>
        <CustomTitle variant="title">Account details</CustomTitle>
        <View style={styles.container}>
          <PaymentMethodsComponent
            isCart={false}
            selectedMethod={selectedMethod}
            setSelectedMethod={setSelectedMethod}
            setModalVisible={setModalVisible}
          />
        </View>
      </View>
      <PaymentMethodBottomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        selectedMethod={selectedMethod}
      />
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
    //paddingHorizontal: 16,
  },
  container: {
    paddingVertical: 20,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    textAlign: 'center',
  },
});
