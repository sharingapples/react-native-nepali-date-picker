import React from 'react';
import { Text, TouchableHighlight, StyleSheet } from 'react-native';


type Props = {
  date: Date,
  value: Number,
  isCurrentMonth: boolean,
  isSelectedDate: boolean,
  onChange: (Date) => void,
}

const styles = (isCurrentMonth, isSelectedDate) => StyleSheet.create({
  container: {
    backgroundColor: isSelectedDate && isCurrentMonth ? 'blue' : null,
    width: `${100 / 7} %`,
    alignItems: 'center',
  },
  textStyle: {
    // eslint-disable-next-line no-nested-ternary
    color: isCurrentMonth ? (isSelectedDate ? 'white' : 'black') : 'grey',
  },
});

const Day = ({
  date, isCurrentMonth, isSelectedDate, onChange, value,
} : Props) => {
  const style = styles(isCurrentMonth, isSelectedDate);
  return (
    <TouchableHighlight
      style={style.container}
      onPress={() => onChange(date)}
    >
      <Text style={[style.textStyle]}>{value} </Text>
    </TouchableHighlight>
  );
};

export default Day;
