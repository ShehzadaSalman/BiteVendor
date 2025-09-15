import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../../constants';
import { FONT_SIZE } from '../../utils/spacing';
import { useNavigation } from '@react-navigation/native';

export default function PaymentMethodsComponent(props) {
  const { isCart, selectedMethod, setSelectedMethod, setModalVisible } = props;
  const [isSelected, setSelected] = useState(false);
  const navigation = useNavigation();
  const paymentMethods = [
    {
      id: 'cod',
      label: 'Cash on Delivery',
      icon: require('../../assets/images/Cart/cash.png'),
    },
    {
      id: 'card',
      label: 'Credit or Debit Card',
      icon: require('../../assets/images/Cart/debitCard.png'),
      visaIcon: require('../../assets/images/Cart/Visa.png'),
      platinumIcon: require('../../assets/images/Cart/visaPlatinum.png'),
      link: true,
    },
    {
      id: 'jazzcash',
      label: 'Jazzcash',
      icon: require('../../assets/images/Cart/JazzCash.png'),
      // link: true,
    },
    {
      id: 'easypaisa',
      label: 'Easypaisa',
      subtitle: 'Link an account',
      icon: require('../../assets/images/Cart/Easypaisa.png'),
    },
  ];

  const visibleMethods = isCart
    ? paymentMethods
    : paymentMethods.filter(item => item.id !== 'cod');
  return (
    <View>
      {visibleMethods.map(item => (
        <TouchableOpacity
          key={item.id}
          style={styles.methodRow}
          onPress={() => {
            if (item.link) {
              {
                navigation.navigate('Payment', {
                  screen: 'AddCreditDebitCardScreen',
                });
                //navigation.navigate('AddCreditDebitCardScreen');
              }
            } else {
              setSelectedMethod(item.id);
              setModalVisible(true);
            }
          }}
        >
          <View style={styles.methodInfo}>
            {/* {item.icon && <Image source={item.icon}   />} */}
            {item.icon && <Image source={item.icon} style={styles.icon} />}
            <View>
              <View style={styles.row}>
                <Text style={styles.label}>{item.label}</Text>
                {item.subtitle && (
                  <Text style={styles.subtitle}>{item.subtitle}</Text>
                )}
              </View>

              {item.visaIcon && (
                <View style={[styles.row, { width: 45 }]}>
                  <Image source={item.visaIcon} />
                  <Image source={item.platinumIcon} />
                </View>
              )}
            </View>
          </View>

          {item.balance && <Text>{item.balance}</Text>}
          {item.id === 'easypaisa' ? (
            <TouchableOpacity
              style={[styles.radioOuter]}
              onPress={() => setSelected(prev => !prev)}
            >
              {isSelected && <View style={styles.radioInner} />}
            </TouchableOpacity>
          ) : (
            <Image
              source={require('../../assets/images/Cart/right-chevron.png')}
            />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  methodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  methodInfo: { flexDirection: 'row', alignItems: 'center' },
  icon: { marginRight: 10 },
  label: {
    fontFamily: FONTS.medium500,
    fontSize: FONT_SIZE.xSmall,
    fontWeight: '500',
    lineHeight: FONT_SIZE.xSmall * 1.5,
    color: COLORS.text,
  },
  balanceLabel: {
    fontFamily: FONTS.bold700,
    fontSize: FONT_SIZE.medium,
    fontWeight: 'bold',
  },

  subtitle: {
    fontFamily: FONTS.regular400,
    fontWeight: '400',
    fontSize: FONT_SIZE.small,
    lineHeight: FONT_SIZE.small * 1.5,
    color: COLORS.grayText1,
    marginLeft: 5,
  },
  radioOuter: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.black,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
