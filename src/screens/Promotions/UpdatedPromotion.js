import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { COLORS } from '../../constants';
import HeaderComponent from '../../components/HeaderComponent';
import CustomTitle from '../../components/CustomTitle';

export default function UpdatedPromotion({ navigation }) {
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.goBack(); // ⬅️ goes back after 3s
    }, 3000);

    return () => clearTimeout(timer); // cleanup
  }, [navigation]);

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <View
        style={{
          paddingHorizontal: 16,
        }}
      >
        <HeaderComponent
          title=""
          leftIcon="chevron"
          rightIcon={require('../../assets/images/Header/notification.png')}
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            source={require('../../assets/images/Promotions/updated.png')}
            style={{ marginVertical: 10 }}
          />

          <CustomTitle variant="title">Your promotion is updated</CustomTitle>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
