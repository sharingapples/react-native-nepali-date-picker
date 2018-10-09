import React, { Component } from 'react';
import {
  View, Button, Text,
} from 'react-native';
import NepaliDate from 'nepali-date';
import WeekHeader from './WeekHeader';
import Day from './Day';
import {
  convertDate,
} from './CalendarHelper/__calendarHelper';
import { NUM_OF_WEEKS } from '../common/Constant';

type Props = {
  value: Date,
  dateType: string,
  onChange: (value: Date) => void,
}

class Calendar extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      value: props.value,
      month: convertDate(props.value, props.dateType),
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.dateType !== state.dateType) {
      return {
        month: convertDate(props.value, props.dateType),
        dateType: props.dateType,
      };
    }

    if (props.value !== state.value) {
      return {
        month: convertDate(props.value, state.dateType),
        value: props.value,
      };
    }

    return null;
  }

  getWeekDays(currentDate) {
    const { month } = this.state;
    const { onChange, dateType } = this.props;
    const selectedDate = month.date;
    const days = [];
    const date = currentDate;
    for (let c = 0; c < 7; c += 1) {
      days.push(
        <Day
          key={date}
          date={convertDate(date, dateType).date}
          value={date.getDate()}
          isCurrentMonth={date.getMonth() === month.getMonth()}
          isSelectedDate={date.getMonth() === selectedDate.getMonth()
            && date.getDate() === selectedDate.getDate()}
          onChange={onChange}
        />,
      );
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  prevMonth() {
    this.setState(({ month }) => ({
      month: month.getPrevMonth(),
    }));
  }

  nextMonth() {
    this.setState(({ month }) => ({
      month: month.getNextMonth(),
    }));
  }

  render() {
    const { month } = this.state;
    const startingDate = month.getStartingDate();
    const date = startingDate;
    const data = [];
    for (let r = 0; r < NUM_OF_WEEKS; r += 1) {
      const calendarRow = (
        <View
          key={date}
          style={{ flexDirection: 'row' }}
        >
          {this.getWeekDays(date)}
        </View>

      );
      data.push(calendarRow);
    }

    if (date.getMonth() === month.getMonth()) {
      // if the month has more than 5 weeks
      data.push(
        <View
          key={date}
          style={{ flexDirection: 'row' }}
        >
          {this.getWeekDays(date)}
        </View>,
      );
    }

    return (
      <View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: '35%', flexDirection: 'row' }}>
            <Button title="Prev" onPress={() => this.prevMonth()} />
          </View>
          <View style={{ width: '30%', alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}> {month.getCurrentMonth()} </Text>
          </View>
          <View style={{ width: '35%', flexDirection: 'row-reverse' }}>
            <Button title="Next" onPress={() => this.nextMonth()} />
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <WeekHeader />
        </View>
        {data}
      </View>

    );
  }
}
export default Calendar;
