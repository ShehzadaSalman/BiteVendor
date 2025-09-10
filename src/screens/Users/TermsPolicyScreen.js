import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '../../constants';
import HeaderComponent from '../../components/HeaderComponent';
import { FONT_SIZE } from '../../utils/spacing';
import { useNavigation } from '@react-navigation/native';

const TermsPolicyScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}

      <HeaderComponent title="Terms & policies" />
      <View style={{ marginTop: 20 }}>
        {/* Options */}
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('TermsConditions')}
        >
          <Text style={styles.optionText}>Terms & conditions</Text>
          <Image
            source={require('../../assets/images/HelpCenter/right-chevron.png')}
            style={styles.arrow}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('DataPolicy')}
        >
          <Text style={styles.optionText}>Data policy</Text>
          <Image
            source={require('../../assets/images/HelpCenter/right-chevron.png')}
            style={styles.arrow}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TermsPolicyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
  },

  option: {
    flexDirection: 'row',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  optionText: {
    fontSize: FONT_SIZE.medium,
    fontFamily: FONTS.bold700,
    fontWeight: 'bold',
  },
  arrow: {
    width: 8,
    height: 8,
  },
});
