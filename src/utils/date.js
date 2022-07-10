import {
  getYear,
  getMonth,
  getDate,
  getDay,
  getHours,
  getMinutes,
  getSeconds,
  getMilliseconds,
  format
} from "date-fns";
import { ko , enUS } from 'date-fns/locale'

export const DB_FORMAT = 'yyyy-MM-dd HH:mm:ss';

export const CALNEADR_HEADER_FORMAT = 'yyyy년 M월';
export const CALNEADR_YYYYMM_FORMAT = 'yyyy-MM';
export const CALNEADR_DATE_FORMAT = 'yyyy-MM-dd';

export const TIME_FORMAT = 'HH:mm';
export const KO_DATE_FORMAT = 'yyyy.MM.dd';
export const KO_DATETIME_FORMAT = 'yyyy.MM.dd HH:mm:ss';

export const KO_DISPLAY_FORMAT = 'yyyy년 MM월 dd일 (E요일) HH:mm';
export const KO_MODAL_DISPLAY_FORMAT = 'yyyy. MM. dd E요일';
export const KO_TIME_FORMAT = 'HH:mm';
export const KO_END_DATE_FORMAT = 'HH:mm (a)';

export function getWeekOfMonth (date) {
  if (typeof(date) != 'object') date = new Date()
  let selectedDayOfMonth = date.getDate();

  let first = new Date(date.getFullYear() + '/' + (date.getMonth() + 1) + '/01');
  let  monthFirstDateDay = first.getDay();

  return Math.ceil((selectedDayOfMonth + monthFirstDateDay) / 7);
};

export const convertCalendarHeader = (date) => {
  if (typeof(date) != 'object') date = new Date()
  return format(date, CALNEADR_HEADER_FORMAT);
}

export const convertCalendarYearMonth = (date) => {
  if (typeof(date) != 'object') date = new Date()
  return format(date, CALNEADR_YYYYMM_FORMAT);
}

export const convertCalendarDate = (date) => {
  if (typeof(date) != 'object') date = new Date()
  return format(date, CALNEADR_DATE_FORMAT);
}