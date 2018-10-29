import React from 'react';
import { View, Text } from 'react-native';
import { FONT_COLOR_GREY, APP_COLOR } from './CalendarHelper/CalendarConstant';

const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const DaysHeader = () => days && days.map((d, idx) => (
  // eslint-disable-next-line
  <View key={idx} style={{ width: `${100 / 7} %`, alignItems: 'center' }}>
    <Text style={{ fontWeight: '500', color: d === 'S' ? APP_COLOR : FONT_COLOR_GREY }}> {d} </Text>
  </View>
));

const WeekHeader = () => (
  <View style={{ flexDirection: 'row', marginTop: '2%' }}>
    <DaysHeader />
  </View>
);

export default WeekHeader;
