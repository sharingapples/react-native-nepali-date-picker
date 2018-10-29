// @flow
import { clone } from 'lodash';
import type { Calendar } from './Calendar';
import { englishMonth } from './CalendarConstant';

class EnglishCalendar implements Calendar {
  constructor(date) {
    this.date = date.timestamp || date;
  }

  getStartingDate() {
    const date = clone(this.date);
    date.setDate(1);
    const day = -Math.abs(date.getDay()) + 1;
    date.setDate(day);
    return date;
  }

  getCurrentMonth() {
    return englishMonth[this.date.getMonth()];
  }

  getNextMonth() {
    const dateObj = clone(this.date);
    const date = new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 1);
    return new EnglishCalendar(date);
  }

  getPrevMonth() {
    const dateObj = clone(this.date);
    const date = new Date(dateObj.getFullYear(), dateObj.getMonth() - 1, 1);
    return new EnglishCalendar(date);
  }

  getMonth() {
    return this.date.getMonth();
  }

  getYear() {
    return this.date.getFullYear();
  }

  getDate() {
    return this.date.getDate();
  }

  getYearList() {
    const yearList = [];
    const currentDate = new EnglishCalendar(this.date);
    let yearStart = currentDate.getYear() - 150;
    for (let i = 0; i < 500; i += 1) {
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
    const year = this.getYear();
    const month = this.getMonth() + 1;
    const day = this.getDate();
    const res = format.replace('YYYY', year).replace('MM', month).replace('DD', day);
    return res;
  }
}

export default EnglishCalendar;
