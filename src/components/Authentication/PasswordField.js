import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { COLORS, FONTS } from '../../constants';
import { FONT_SIZE } from '../../utils/spacing';

const PasswordField = ({ label, value, onChangeText }) => {
  const [secure, setSecure] = useState(true);

  return (
    <View style={styles.row}>
      <TextInput
        style={styles.input}
        placeholder={label}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secure}
        autoCapitalize="none"
      />
      <TouchableOpacity onPress={() => setSecure(!secure)}>
        <Image
          source={
            secure
              ? require('../../assets/images/Authentication/invisible.png')
              : require('../../assets/images/Authentication/visible.png')
          }
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: COLORS.grayText1,
    borderRadius: 20,
    marginBottom: 5,
  },
  input: {
    fontSize: FONT_SIZE.normal,
    color: COLORS.grayText1,
    fontFamily: FONTS.semiBold600,
    fontWeight: '600',
    height: 35,
  },
  icon: {
    marginLeft: 10,
  },
});

export default PasswordField;
