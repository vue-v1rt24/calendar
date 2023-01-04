import {getDaysOfMonth, getIndexWeekday} from '../utils/date.utils';

export const useCalendar = (calendarDate: Date) => {
    const date = calendarDate;
    const month = date.getMonth();
    const year = date.getFullYear();
    const daysCount = getDaysOfMonth(month, year);
    const startWeekday = getIndexWeekday(month, year);
    let daysData = [];

    for (let i = startWeekday; i < daysCount + startWeekday; i++) {
        daysData[i] = new Date(year, month, i - startWeekday + 1);
    }

    return {
        daysData,
    };
};