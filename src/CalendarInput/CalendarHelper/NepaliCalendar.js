import { clone } from 'lodash';
import NepaliDate from 'nepali-date';
import type { Calendar } from './Calendar';
import { getStartingDate } from './__calendarHelper';
import { nepaliMonth } from '../../common/Constant';

class NepaliCalendar implements Calendar {
  constructor(date) {
    this.date = new NepaliDate(date);
  }

  getStartingDate() {
    return getStartingDate(this.date);
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

  format(format) {
    return this.date.format(format);
  }
}

export default NepaliCalendar;
