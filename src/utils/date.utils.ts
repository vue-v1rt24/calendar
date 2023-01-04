import {test} from '../testing/test';

// Вывод названия дня недели
export const getWeekdayName = (num: number) => {
    const d = new Date(2023, 0, 2);
    d.setDate(d.getDate() + num);
    return d.toLocaleDateString('ru-RU', {weekday: 'long'});
};

// Получение количества дней в месяце
export const getDaysOfMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
};

// Получение индекса дня, в которое начинается месяц
export const getIndexWeekday = (month: number, year: number) => {
    const d = new Date(year, month, 1);
    return d.getUTCDay();
};

// Получение названия месяца
export const getMonthName = (num: number) => {
    const d = new Date(2023, num);
    return d.toLocaleDateString('ru-RU', {month: 'long'});
};

// Получение текущего числа месяца
export const getCurrentDay = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleDateString() === new Date().toLocaleDateString();
};

// Получение текущей даты
export const getISODate = (date: Date) => {
    const d = new Date(date);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().split('T')[0];
};


















