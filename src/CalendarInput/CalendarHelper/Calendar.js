// @flow
export interface Calendar {
  getMonth: () => number;
  getYear: () => number;
  getDate: () => number;
  getStartingDate: () => Date;
  getCurrentMonth: () => String;
  getNextMonth: () => Date;
  getPrevMonth: () => Date;
  getYearList: () => Array;
  setMonth: () => void;
  setYear: () => void;
  format: (String) => String;
}
