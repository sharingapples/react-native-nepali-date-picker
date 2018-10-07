import React, { Component } from 'react';
import {
  View, Text, TouchableHighlight,
} from 'react-native';
import NepaliDate from 'nepali-date';
import WeekHeader from './WeekHeader';
import CalendarRow from './CalendarRow';
import calendarGenerator from './calendar';

const nepaliMonthEng = ['Baishakh', 'Jestha', 'Ashadh', 'Shrawan', 'Bhadra', 'Ashwin', 'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'];

const dayEng = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const dayDisplayEng = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


type Props = {
  value: Date,
  onSelect: () => any,
}

class NepaliCalendar extends Component<Props> {
  constructor() {
    super();
    this.state = {
      data: null,
    };
  }

  componentWillMount() {
    const { value } = this.props;
    const dateObj = new NepaliDate(value);
    const selectedDate = new NepaliDate(value);
    const prevDate = new NepaliDate(value);
    this.setState({
      dateObj,
      prevDate,
      selectedDate,
      data: calendarGenerator(dateObj.getYear(), dateObj.getMonth()),
    });
    this.changeMonth = this.changeMonth.bind(this);
    this.selectDate = this.selectDate.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    const { onSelect } = this.props;
    const { selectedDate } = this.state;
    onSelect(selectedDate);
  }

  onCancel() {
    const { onSelect } = this.props;
    const { prevDate } = this.state;
    onSelect(prevDate);
  }

  changeMonth(prev = false, date = 1) {
    const { dateObj, selectedDate } = this.state;
    const nextMonth = prev ? dateObj.getMonth() - 1 : dateObj.getMonth() + 1;
    dateObj.setMonth(nextMonth);
    selectedDate.setMonth(nextMonth);
    selectedDate.setDate(date);
    const data = calendarGenerator(dateObj.getYear(), nextMonth);
    this.setState({
      data,
    });
  }

  selectDate(date) {
    const { selectedDate } = this.state;
    const { onSelect } = this.props;
    selectedDate.setDate(date);
    this.setState({
      selectedDate,
    }, () => onSelect(selectedDate));
  }

  render() {
    const {
      data, dateObj, selectedDate,
    } = this.state;
    return (
      <View
        style={{
          marginTop: 75,
          width: '90%',
          border: 'grey',
          borderWidth: 1,
          alignSelf: 'center',
        }}
      >
        <View
          style={{
            backgroundColor: '#008D7F',
            alignItems: 'center',
            justifyContent: 'center',
            height: 30,
          }}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 16,
            }}
          >
            {dayDisplayEng[dateObj.getDay()]}
          </Text>
        </View>
        <View
          style={{
            paddingTop: 10,
            backgroundColor: '#009788',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontSize: 23 }}>
            {nepaliMonthEng[selectedDate.getMonth()]}
          </Text>
          <Text style={{ color: 'white', fontSize: 55 }}>
            {selectedDate.getDate()}
          </Text>
          <Text style={{ color: 'white', fontSize: 24 }}>
            {selectedDate.getYear()}
          </Text>
        </View>

        <View style={{ marginTop: 15 }}>
          <View style={{ alignItems: 'center' }}>
            <Text
              style={{
                color: '#008D7F',
                fontSize: 16,
                fontWeight: 'bold',
              }}
            >
              {nepaliMonthEng[dateObj.getMonth()]} {dateObj.getYear()}
            </Text>
          </View>
          <View
            style={{
              marginTop: 10,
              marginBottom: 10,
              flexDirection: 'row',
            }}
          >
            <WeekHeader days={dayEng} />
          </View>
          <View>
            <CalendarRow
              weeks={data}
              selectedDate={selectedDate.getDate()}
              selectDate={d => this.selectDate(d)}
              changeMonth={(prev, date) => this.changeMonth(prev, date)}
            />
          </View>

          <View
            style={{
              paddingTop: 10,
              backgroundColor: '#009788',
              alignItems: 'center',
            }}
          >
            <TouchableHighlight onPress={this.changeMonth}>
              <Text
                style={{
                  fontSize: 20,
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
                {nepaliMonthEng[(dateObj.getMonth() + 1) % 12]}
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

export default NepaliCalendar;
