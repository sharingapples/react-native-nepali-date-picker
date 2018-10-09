import loadsh from 'lodash';
import NepaliCalendar from './NepaliCalendar';
import EnglishCalendar from './EnglishCalendar';
import { DATE_TYPE_AD, DATE_TYPE_BS } from '../../common/Constant';

export function getStartingDate(calendarObj) {
  const date = loadsh.clone(calendarObj);
  date.setDate(1);
  const day = -Math.abs(date.getDay()) + 1;
  date.setDate(day);
  return date;
}


export function formatDate(date, format, dateType = DATE_TYPE_BS) {
  return dateType === DATE_TYPE_AD
    ? new EnglishCalendar(date).format(format)
    : new NepaliCalendar(date).format(format);
}

export function convertDate(date, dateType) {
  return dateType === DATE_TYPE_AD ? new EnglishCalendar(date) : new NepaliCalendar(date);
}
