// @flow
export interface Calendar {
  getMonth: () => number;
  getYear: () => number;
  getStartingDate: () => Date;
  getCurrentMonth: () => String;
  getNextMonth: () => Date;
  getPrevMonth: () => Date;
  format: (String) => String;
}
