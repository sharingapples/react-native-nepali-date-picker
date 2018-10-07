import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

type day = {
  day: string,
  date: number,
  month: number,
  prev: boolean,
}

type Props = {
  days: Array<day>,
  selectedDate: Number,
}

const WeekRow = ({
  days, selectedDate, selectDate, changeMonth,
} : Props) => days && days.map((d, idx) => {
  const containerBackground = selectedDate === d.date && d.month ? 'blue' : null;
  // eslint-disable-next-line
  const textColor = d.month ? (selectedDate === d.date ? 'white' : 'black') : 'grey';
  return (
    <TouchableHighlight
    // eslint-disable-next-line
      key={idx}
      onPress={d.month ? () => selectDate(d.date) : () => changeMonth(d.prev, d.date)}
      style={{
        width: `${100 / 7} %`,
        alignItems: 'center',
        backgroundColor: containerBackground,
      }}
    >
      <View>
        <Text style={{ color: textColor }}> {d && d.date} </Text>
      </View>
    </TouchableHighlight>

  );
});

export default WeekRow;
