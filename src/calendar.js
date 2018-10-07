import NepaliCalendar from 'nepali-date';

const dayEng = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const calendarGenerator = (selectedYear, selectedMonth) => {
  const getCalendarData = new NepaliCalendar(selectedYear, selectedMonth, 1);
  const firstDayOfMonth = getCalendarData.getDay() - 1;
  const currentMonth = getCalendarData.getMonth();
  const weeks = [];

  getCalendarData.setDate(-firstDayOfMonth);
  const firstWeek = [];
  for (let j = 0; j < 7; j += 1) {
    const currentDate = getCalendarData.getDate();
    const month = getCalendarData.getMonth();
    const data = {
      day: dayEng[j],
      date: currentDate,
      month: currentMonth === month,
      prev: true,
    };
    firstWeek.push(data);
    getCalendarData.setDate(currentDate + 1);
  }
  weeks.push(firstWeek);

  while (currentMonth === getCalendarData.getMonth()) {
    const week = [];
    for (let j = 0; j < 7; j += 1) {
      const currentDate = getCalendarData.getDate();
      const month = getCalendarData.getMonth();
      const data = {
        day: dayEng[j],
        date: currentDate,
        month: currentMonth === month,
      };
      getCalendarData.setDate(currentDate + 1);
      week.push(data);
    }
    weeks.push(week);
  }
  return weeks;
};

export default calendarGenerator;
