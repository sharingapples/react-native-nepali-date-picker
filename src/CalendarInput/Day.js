import React from 'react';
import { Text, TouchableHighlight, StyleSheet } from 'react-native';
import { APP_COLOR, BACKGROUND_COLOR } from './CalendarHelper/CalendarConstant';


type Props = {
  date: Date,
  value: Number,
  isCurrentMonth: boolean,
  selectedDate: Array<Date>,
  calendarDate: Array<Date>,
  onChange: (Date) => void,
}

const styles = (isCurrentMonth, isSelectedDate) => StyleSheet.create({
  container: {
    backgroundColor: isSelectedDate && isCurrentMonth ? APP_COLOR : BACKGROUND_COLOR,
    width: `${100 / 7} %`,
    borderRadius: isSelectedDate && isCurrentMonth ? 50 : 0,
    alignItems: 'center',
  },
  textStyle: {
    // eslint-disable-next-line no-nested-ternary
    color: isCurrentMonth ? (isSelectedDate ? 'white' : 'black') : 'grey',
    alignSelf:"center",
    textAlign:"center",
    // padding:5,
    marginLeft:5,
    marginTop:5
  },
});

const Day = ({
  date, isCurrentMonth, onChange, value, selectedDate, calendarDate
} : Props) => {
  const style = styles(isCurrentMonth,
    isCurrentMonth && (selectedDate.getDate() === calendarDate.getDate()));
  return (
    <TouchableHighlight
      disabled={!isCurrentMonth}
      style={style.container}
      onPress={() => {
        console.log("check the date =>", date)
        onChange(date)
      }}
    >
      <Text style={[style.textStyle,{fontFamily: "Poppins-Regular"}]}>{value} </Text>
    </TouchableHighlight>
  );
};

export default Day;
