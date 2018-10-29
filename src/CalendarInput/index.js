import React, { Component } from 'react';
import {
  View,
  Button,
  Text,
  Modal,
  Dimensions,
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { clone } from 'lodash';
import NepaliDate from 'nepali-date';
import WeekHeader from './WeekHeader';
import Day from './Day';
import {
  convertDate, convertToDropDownData, getMonthList,
} from './CalendarHelper/__calendarHelper';
import {
  NUM_OF_WEEKS,
  BACKGROUND_COLOR,
  APP_COLOR,
  FONT_COLOR_WHITE_RGBA,
  FONT_COLOR_BLACK_RGBA,
  FONT_COLOR_GREY_RGBA,
  DATE_TYPE,
  DATE_TYPE_BS,
} from '../common/Constant';

type Props = {
  value: Date,
  dateType: string,
  onSelect: (value: Date) => void,
}

const styles = {
  container: {
    backgroundColor: BACKGROUND_COLOR,
    height: '50%',
    width: '88%',
    borderRadius: 10,
  },
  header: {
    backgroundColor: APP_COLOR,
    height: '33%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  headerContainer: {
    marginBottom: 10,
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  flexDirectionRowReverse: {
    flexDirection: 'row-reverse',
  },
};

class Calendar extends Component<Props> {
  constructor(props) {
    super(props);
    const dateType = props.dateType || DATE_TYPE_BS;
    const value = props.value || new Date();
    const date = convertDate(value, dateType);
    const selectedDate = convertDate(value, DATE_TYPE_BS);
    const currentYear = date.getYear();
    const currentMonth = date.getMonth();
    const yearList = convertToDropDownData(date.getYearList());
    const monthList = convertToDropDownData(getMonthList(dateType));
    this.state = {
      // // eslint-disable-next-line react/no-unused-state
      date,
      prevDate : clone(date),
      dateType,
      currentYear,
      currentMonth,
      selectedDate,
      yearList,
      monthList,
    };
  }


  getWeekDays(currentDate) {
    const { date, selectedDate } = this.state;
    const days = [];
    const calendarDate = currentDate;
    for (let c = 0; c < 7; c += 1) {
      days.push(
        <Day
          key={calendarDate}
          date={clone(calendarDate)}
          value={calendarDate.getDate()}
          isCurrentMonth={date.getMonth() === calendarDate.getMonth()}
          calendarDate={clone(calendarDate)}
          selectedDate={clone(selectedDate)}
          onChange={d => this.changeSelectedDate(d)}
        />,
      );
      calendarDate.setDate(calendarDate.getDate() + 1);
    }
    return days;
  }

  changeDateType(dateType) {
    // eslint-disable-next-line
    const selectedDate = this.state.date;
    const date = convertDate(selectedDate.date, dateType);
    const yearList = convertToDropDownData(date.getYearList());
    const monthList = convertToDropDownData(getMonthList(dateType));
    this.setState({
      dateType,
      date,
      selectedDate: date,
      yearList,
      monthList,
    });
  }

  changeMonth(currentMonth) {
    const { date, monthList } = this.state;
    const nextMonth = monthList.map((m, idx) => {
      if (m.value === currentMonth) {
        return idx;
      }
      return null;
    }).filter(m => m != null);
    date.setMonth(nextMonth);
    this.setState({ currentMonth });
  }

  changeYear(currentYear) {
    const { date } = this.state;
    date.setYear(currentYear);
    this.setState({ currentYear });
  }


  changeSelectedDate(date) {
    const { dateType } = this.state;
    const { onSelect } = this.props;
    const selectedDate = convertDate(date, dateType);
    this.setState({
      selectedDate,
    });

    if (onSelect) {
      onSelect(selectedDate.date);
    }
  }


  render() {
    const {
      dateType, date, yearList, monthList, selectedDate, prevDate,
    } = this.state;
    const { onChange, onCancel } = this.props;
    const startingDate = date.getStartingDate();
    const data = [];
    for (let r = 0; r < NUM_OF_WEEKS; r += 1) {
      const calendarRow = (
        <View
          key={startingDate}
          style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}
        >
          {this.getWeekDays(startingDate)}
        </View>

      );
      data.push(calendarRow);
    }

    if (date.getMonth() === startingDate.getMonth()) {
      // if the month has more than 5 weeks
      data.push(
        <View
          key={startingDate}
          style={{ flexDirection: 'row' }}
        >
          {this.getWeekDays(startingDate)}
        </View>,
      );
    }
    return (
      <View style={[styles.container]}>
        <View style={[styles.header]}>
          <View style={[styles.headerContainer]}>
            <View style={styles.flexDirectionRow}>
              <View style={{ width: '25%', marginLeft: 10 }}>
                <Dropdown
                  value={date.getYear()}
                  data={yearList}
                  itemColor={FONT_COLOR_BLACK_RGBA}
                  textColor={FONT_COLOR_WHITE_RGBA}
                  selectedItemColor={FONT_COLOR_GREY_RGBA}
                  onChangeText={v => this.changeYear(v)}
                />
              </View>
              <View style={{ width: '70%' }}>
                <View style={styles.flexDirectionRowReverse}>
                  <View style={{ width: 52 }}>
                    <Dropdown
                      value={dateType}
                      data={DATE_TYPE}
                      itemColor={FONT_COLOR_BLACK_RGBA}
                      textColor={FONT_COLOR_WHITE_RGBA}
                      selectedItemColor={FONT_COLOR_GREY_RGBA}
                      onChangeText={v => this.changeDateType(v)}
                    />
                  </View>
                </View>
              </View>
            </View>

            <View style={{ alignContent: 'center', alignItems: 'center', marginBottom: 20 }}>
              <View style={{ width: 120 }}>
                <Dropdown
                  value={monthList[date.getMonth()].value}
                  data={monthList}
                  fontSize={20}
                  containerStyle={{ marginTop: -15 }}
                  itemColor={FONT_COLOR_BLACK_RGBA}
                  textColor={FONT_COLOR_WHITE_RGBA}
                  selectedItemColor={FONT_COLOR_GREY_RGBA}
                  onChangeText={v => this.changeMonth(v)}
                />
              </View>
            </View>

          </View>
        </View>

        <View style={{ alignContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '95%' }}>
            <WeekHeader />
            {data}
            <View style={{ flexDirection: 'row-reverse' }}>
              <Button title="Ok" onPress={() => onChange && onChange(selectedDate)} />
              <Button title="Cancel" onPress={() => onCancel && onCancel(prevDate)} />

            </View>
          </View>
        </View>
      </View>

    );
  }
}
export default Calendar;
