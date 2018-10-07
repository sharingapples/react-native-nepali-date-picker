import React from 'react';
import { View } from 'react-native';
import WeekRow from './WeekRow';


type Week = Array<String>;

type Props = {
  weeks: Array<Week>
}

const CalendarRow = ({ weeks, ...other }: Props) => weeks && weeks.map((w, idx) => (
  // eslint-disable-next-line
  <View key={idx} style={{ flexDirection: 'row'  }}>
    <WeekRow days={w} {...other} />
  </View>
));

export default CalendarRow;
