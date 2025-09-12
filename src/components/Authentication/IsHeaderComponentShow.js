import React from 'react';
import { View } from 'react-native';
import HeaderComponent from '../HeaderComponent';
export default function IsHeaderComponentShow({
  goToStep,
  onClose,
  isScreen,
  gotoBack,
}) {
  return (
    <View style={isScreen && { paddingHorizontal: 16 }}>
      {!isScreen && (
        <HeaderComponent
          title=""
          leftIcon="chevron"
          bottomBorder={false}
          onleftPress={() => goToStep(gotoBack)}
          rightIcon={require('../../assets/images/Authentication/Cross1.png')}
          onRightPress={onClose}
        />
      )}
    </View>
  );
}
