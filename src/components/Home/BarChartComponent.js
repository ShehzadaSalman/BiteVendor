import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart, Grid, YAxis } from 'react-native-svg-charts';
import { COLORS, FONTS } from '../../constants';
import { FONT_SIZE } from '../../utils/spacing';

export default function BarChartComponent({ chartData }) {
  const yLabels = [0, 100, 500, 800, 1000]; // vertical axis labels

  const normalizedData =
    chartData?.map(item =>
      typeof item === 'number' ? { value: item } : item,
    ) || [];

  const values = normalizedData.map(item => item.value);

  return (
    <View style={styles.wrapper}>
      <View style={styles.chartRow}>
        {/* Y Axis */}
        <YAxis
          data={yLabels}
          contentInset={{ top: 20, bottom: 20 }}
          svg={styles.axisLable}
          numberOfTicks={4}
          formatLabel={value => `${value}`}
        />

        {/* Bar Chart */}
        <View style={{ flex: 1, marginLeft: 8 }}>
          <BarChart
            style={styles.chartBarBorder}
            data={normalizedData}
            yAccessor={({ item }) => item.value}
            svg={{ fill: COLORS.primary }}
            contentInset={{ top: 20, bottom: 1 }}
            spacingInner={0.5}
            spacingOuter={0.3}
            yMin={0}
            yMax={1000}
          >
            <Grid />
          </BarChart>

          {/* X Axis labels under chart */}
          <View style={styles.xLabels}>
            {['08.00', '10.00', '12.00', '14.00', '16.00'].map(t => (
              <Text key={t} style={styles.axisLable}>
                {t}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
  },
  chartRow: {
    flexDirection: 'row',
  },
  xLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingRight: 10, // to align with chart margin
  },

  axisLable: {
    fill: COLORS.text,
    fontSize: FONT_SIZE.xSmall,
    fontFamily: FONTS.bold700,
    fontWeight: '700',
  },
  chartBarBorder: {
    height: 200,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderGray,
    borderRightWidth: 1,
    borderRightColor: COLORS.borderGray,
    borderLeftWidth: 1,
    borderLeftColor: COLORS.borderGray,
  },
});
