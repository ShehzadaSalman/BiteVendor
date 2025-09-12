import React from 'react';
import { View, Text, StyleSheet, TextInput, Image } from 'react-native';
import AppButton from '../AppButton';
import { BORDER_RADIUS, FONT_SIZE } from '../../utils/spacing';
import { COLORS, FONTS } from '../../constants';
import IsHeaderComponentShow from './IsHeaderComponentShow';
export default function YourEmailComponent({
  goToNext,
  onClose,
  isScreen = false,
}) {
  const imageSource = isScreen
    ? require('../../assets/images/Authentication/yourEmailScreen.png')
    : require('../../assets/images/Authentication/yourEmail.png');

  const handleContinuePress = () => {
    if (!isScreen) {
      goToNext(2);
    } else {
      goToNext();
    }
  };

  return (
    <View style={[styles.content, isScreen && { paddingHorizontal: 16 }]}>
      <IsHeaderComponentShow
        goToStep={goToNext}
        onClose={onClose}
        isScreen={isScreen}
        gotoBack={0}
      />

      <View style={{ alignItems: isScreen ? 'center' : 'flex-start' }}>
        <Image source={imageSource} style={styles.image} />
        <Text style={[styles.title, isScreen && { textAlign: 'center' }]}>
          What's your email?
        </Text>
        <Text style={[styles.subText, isScreen && { textAlign: 'center' }]}>
          We'll check if you have an account
        </Text>
      </View>

      <TextInput
        placeholder="Email"
        style={styles.input}
        placeholderTextColor={COLORS.grayText1}
      />
      <AppButton title="Continue" onPress={handleContinuePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    marginTop: 10,
    paddingBottom: 20,
  },
  title: {
    fontFamily: FONTS.bold700,
    fontSize: FONT_SIZE.xlarge,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  subText: {
    fontFamily: FONTS.medium500,
    fontSize: FONT_SIZE.xSmall,
    fontWeight: '500',
    color: COLORS.grayText1,
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.grayText1,
    borderRadius: BORDER_RADIUS.medium,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginVertical: 10,
  },
  image: {
    marginVertical: 15,
    resizeMode: 'contain',
  },
});
