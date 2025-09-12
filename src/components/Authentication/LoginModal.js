import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Modal from 'react-native-modal';
import SignUpOrSigninComponent from './SignUpOrSigninComponent';
import WelcomeBackComponent from './WelcomeBackComponent';
import ForgetYourPasswordComponent from './ForgetYourPasswordComponent';
import { COLORS } from '../../constants';
import YourEmailComponent from './YourEmailComponent';
import CheckYourEmailComponent from './CheckYourEmailComponent';

const LoginModal = ({ visible, onClose }) => {
  const [step, setStep] = useState(0); // 0: Welcome, 1: Email, 2: Password, 3: Forgot

  const goToStep = newStep => setStep(newStep);
  useEffect(() => {
    if (!visible) {
      setStep(0);
    }
  }, [visible]);

  const renderStep = onClose => {
    switch (step) {
      case 0:
        return <SignUpOrSigninComponent goToNext={goToStep} />;
      case 1:
        return <YourEmailComponent goToNext={goToStep} onClose={onClose} />;
      case 2:
        return <WelcomeBackComponent goToNext={goToStep} onClose={onClose} />;
      case 3:
        return (
          <ForgetYourPasswordComponent goToNext={goToStep} onClose={onClose} />
        );
      case 4:
        return (
          <CheckYourEmailComponent goToNext={goToStep} onClose={onClose} />
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose} // ✅ for closing when background is tapped
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={styles.modal}
      backdropOpacity={0.3}
      propagateSwipe={true}
    >
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backgroundOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContainer}>{renderStep(onClose)}</View>
      </View>
    </Modal>
  );
};

export default LoginModal;
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContainer: {
    backgroundColor: COLORS.background,
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  closeBtn: {
    alignSelf: 'flex-end',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0, // very important for full-width bottom modal
  },
});
