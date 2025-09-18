import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { COLORS, FONTS } from '../../constants';
import { BORDER_RADIUS, FONT_SIZE, rh, rw } from '../../utils/spacing';

const FieldComponent = ({ label, value, onChangeText, type = 'text' }) => {
  const [secure, setSecure] = useState(type === 'password');
  const fieldIcon =
    type === 'password'
      ? require('../../assets/images/Authentication/password.png')
      : type === 'email'
      ? require('../../assets/images/Authentication/email.png')
      : require('../../assets/images/Authentication/down-chevron.png'); // new icon for phone

  return (
    <View style={styles.row}>
      <View
        style={[
          styles.leftContainer,
          { width: type === 'phone' ? rw(24) : rw(18) },
        ]}
      >
        {type === 'phone' && <Text style={styles.textLeft}>+92</Text>}
        <Image
          source={fieldIcon}
          style={type === 'phone' ? styles.iconLeftPhone : styles.iconLeft}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder={label}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={type === 'password' ? secure : false}
        autoCapitalize={type === 'email' ? 'none' : 'sentences'}
        maxLength={35}
        keyboardType={
          type === 'email'
            ? 'email-address'
            : type === 'phone'
            ? 'phone-pad'
            : 'default'
        }
      />
      {type === 'password' && (
        <TouchableOpacity
          onPress={() => setSecure(!secure)}
          style={styles.iconRightContainer}
        >
          <Image
            source={
              secure
                ? require('../../assets/images/Authentication/invisible.png')
                : require('../../assets/images/Authentication/visible.png')
            }
            //style={styles.iconRight}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    //justifyContent: 'space-between',
    alignItems: 'center',
    //paddingRight: 10,
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    height: rh(6),
    marginBottom: 20,
    //borderRadius: BORDER_RADIUS.normal,
    backgroundColor: COLORS.white,
    // 👇 Shadow for iOS
    shadowColor: COLORS.borderGray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,

    // 👇 Shadow for Android
    elevation: 3,
  },
  input: {
    fontSize: FONT_SIZE.normal,
    color: COLORS.grayText1,
    fontFamily: FONTS.medium500,
    fontWeight: '500',
    height: 35,
    marginLeft: 10,
  },
  iconRight: {
    // marginLeft: SCREEN_WIDTH / 2,
    //position: 'absolute',
    //right: 10,
  },
  iconRightContainer: { position: 'absolute', right: 10 },
  iconLeft: { marginLeft: 10 },
  iconLeftPhone: { marginLeft: 5, marginTop: 5 },
  textLeft: {
    fontSize: FONT_SIZE.normal,
    fontFamily: FONTS.bold700,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: BORDER_RADIUS.normal,
    borderTopRightRadius: BORDER_RADIUS.normal,
    height: rh(6),
    width: rw(18),
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
});

export default FieldComponent;
