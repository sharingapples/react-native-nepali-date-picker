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
    const yearList = [];
    const currentDate = new NepaliCalendar(this.date);
    let yearStart = currentDate.getYear() - 150;
    for (let i = 0; i < 200; i += 1) {
      yearList.push(yearStart);
      yearStart += 1;
    }
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
