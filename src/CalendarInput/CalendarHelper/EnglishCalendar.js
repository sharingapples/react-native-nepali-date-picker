// @flow
import { clone } from 'lodash';
import type { Calendar } from './Calendar';
import { getStartingDate } from './__calendarHelper';
import { englishMonth } from '../../common/Constant';

class EnglishCalendar implements Calendar {
  constructor(date) {
    this.date = date.timestamp || date;
  }

  getStartingDate() {
    return getStartingDate(this.date);
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

  format(format) {
    const year = this.getYear();
    const month = this.getMonth() + 1;
    const day = this.getDate();
    const res = format.replace('YYYY', year).replace('MM', month).replace('DD', day);
    return res;
  }
}

export default EnglishCalendar;
