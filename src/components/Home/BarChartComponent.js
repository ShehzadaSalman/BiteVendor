import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart, Grid, YAxis } from 'react-native-svg-charts';
import { COLORS, FONTS } from '../../constants';
import { FONT_SIZE } from '../../utils/spacing';

export default function BarChartComponent({ chartData }) {
  const maxValue = Math.max(
    0,
    ...(chartData || []).map(i => (typeof i === 'number' ? i : i?.value || 0)),
  );
  const dynamicMax = Math.ceil((maxValue || 1000) / 100) * 100; // round up to nearest 100
  const step = Math.max(1, Math.floor(dynamicMax / 4));
  const yLabels = [0, step, step * 2, step * 3, step * 4];

  const normalizedData =
    chartData?.map(item =>
      typeof item === 'number' ? { value: item } : item,
    ) || [];

  const values = normalizedData.map(item => item.value);
  const xLabels = (chartData || []).map(item =>
    typeof item === 'number' ? '' : item?.label || '',
  );

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
            yMax={dynamicMax}
          >
            <Grid />
          </BarChart>

          {/* X Axis labels under chart */}
          <View style={styles.xLabels}>
            {xLabels.map((t, idx) => (
              <Text
                key={`${t}-${idx}`}
                style={styles.axisLable}
                numberOfLines={1}
              >
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
    height: 170,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderGray,
    borderRightWidth: 1,
    borderRightColor: COLORS.borderGray,
    borderLeftWidth: 1,
    borderLeftColor: COLORS.borderGray,
  },
});
