import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomToggle from '../../components/CustomToggle';
import HeaderComponent from '../../components/HeaderComponent';
import { COLORS, FONTS } from '../../constants';
import { BORDER_RADIUS, FONT_SIZE } from '../../utils/spacing';

const areas = ['DHA', 'Gulberg', 'Johartown', 'Bahira town'];

export default function OutletsScreen() {
  const [selected, setSelected] = useState({
    DHA: false,
    Gulberg: false,
    Johartown: false,
    'Bahira town': false,
  });

  const toggleSwitch = area => {
    setSelected(prev => ({ ...prev, [area]: !prev[area] }));
  };

  const handleDone = () => {
    const chosen = Object.keys(selected).filter(area => selected[area]);
    console.log('Selected Areas:', chosen);
    // You can navigate or send data back here
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent
        leftIcon="chevron"
        bottomBorder={true}
        isCircle
        rightIcon={require('../../assets/images/Header/notification.png')}
      />
      <View style={styles.subContainer}>
        <View style={styles.grid}>
          {areas.map(area => (
            <View key={area} style={styles.row}>
              <Text style={styles.label}>{area}</Text>

              <CustomToggle
                isActive={selected[area]}
                // setIsActive={() => toggleSwitch(area)}
                onToggle={() => toggleSwitch(area)}
              />
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleDone}>
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 20,
  },
  grid: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  row: {
    width: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  label: {
    fontSize: FONT_SIZE.large,
    fontFamily: FONTS.semiBold600,
    fontWeight: '600',
    color: COLORS.text,
  },
  button: {
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.medium,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.large,
    fontFamily: FONTS.semiBold600,
    fontWeight: '600',
  },
  subContainer: { flex: 1, justifyContent: 'space-between' },
});
