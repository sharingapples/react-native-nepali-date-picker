import { clone } from 'lodash';
import NepaliDate from 'nepali-date';
import type { Calendar } from './Calendar';
import { nepaliMonth } from './CalendarConstant';

class NepaliCalendar implements Calendar {
  constructor(date) {
    this.date = new NepaliDate(date);
  }

  

  getStartingDate() {
    const date = clone(this.date);
    date.setDate(1);
    const day = -Math.abs(date.getDay()) + 1;
    date.setDate(day);
    console.log("check the starting date =>", date)
    return date;
  }

  getCurrentMonth() {
    return nepaliMonth[this.date.getMonth()];
  }

  getNextMonth() {
    const dateObj = clone(this.date);
    const date = new NepaliDate(dateObj.getYear(), dateObj.getMonth() + 1, 1);
    return new NepaliCalendar(date);
  }

  getPrevMonth() {
    const dateObj = clone(this.date);
    const date = new NepaliDate(dateObj.getYear(), dateObj.getMonth() - 1, 1);
    return new NepaliCalendar(date);
  }

  getMonth() {
    return this.date.getMonth();
  }

  getYear() {
    return this.date.getYear();
  }

  getDate() {
    return this.date.getDate();
  }

  getYearList() {
    console.log("check this date =>", this.date)
    const yearList = [];
    const currentDate = new NepaliCalendar(this.date);
    console.log("currentDate =>", currentDate.getYear()-79)
    let yearStart = currentDate.getYear() - 79;
    for (let i = 0; i < 80; i += 1) {
      yearList.push(yearStart);
      yearStart += 1;
    }
    console.log("year start =>", yearList)
    return yearList;
  }

  setMonth(month) {
    this.date.setMonth(month);
  }

  setYear(year) {
    this.date.setYear(year);
  }

  format(format) {
    return this.date.format(format);
  }
}

export default NepaliCalendar;
