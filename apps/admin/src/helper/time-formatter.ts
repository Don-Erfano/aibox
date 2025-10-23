import { strings } from '@/constant';
import moment from 'moment-jalaali';

export function formatJalali(dateIn: Date | string): string {
  return moment(dateIn).format('HH:mm jYYYY/jMM/jDD');
}

export function formatJalaliDate(dateIn: Date | string): string {
  return moment(dateIn).format('jYYYY/jMM/jDD');
}

export function formatRelativeTime(dateString: string) {
  moment.loadPersian();
  return moment(dateString).locale('fa').fromNow();
}

export const setRelativeTime = (date: string) => {
  const stamp = Date.parse(date);
  const currentStamp = Date.now();
  const elapsed = currentStamp - stamp;
  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = month * 12;
  if (elapsed < minute) {
    return strings.secsAgo;
  }
  if (elapsed < hour) {
    return `${Math.round(elapsed / minute)} ${strings.minsAgo}`;
  }
  if (elapsed < day) {
    return `${Math.round(elapsed / hour)} ${strings.hoursAgo}`;
  }
  if (elapsed < month) {
    return `${Math.round(elapsed / day)} ${strings.daysAgo}`;
  }
  if (elapsed < year) {
    return `${Math.round(elapsed / month)} ${strings.monthsAgo}`;
  }
  if (elapsed > year) {
    return `${Math.round(elapsed / year)} ${strings.yearsAgo}`;
  }
  return '';
};
