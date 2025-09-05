import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants';
import HeaderComponent from '../../components/HeaderComponent';
import WelcomeBackComponent from '../../components/Authentication/WelcomeBackComponent';
import { useNavigation } from '@react-navigation/native';
import { signIn } from '../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';

export default function LoginWIthEmailScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    // ✅ validate credentials / call API
    const success = true; // replace with real check
    if (success) {
      dispatch(signIn(true)); // switches nav to BottomTabNavigator
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent leftIcon="chevron" bottomBorder={false} />
      <View style={styles.bottomCardContent}>
        <WelcomeBackComponent goToNext={handleLogin} isScreen={true} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  bottomCardContent: {
    paddingHorizontal: 16,
    paddingTop: 140,
    paddingBottom: 20,
  },
});
