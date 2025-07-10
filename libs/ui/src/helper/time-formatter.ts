import moment from 'moment-jalaali';

export function formatJalali(dateIn: Date | string): string {
  return moment(dateIn).format('HH:mm jYYYY/jMM/jDD');
}
export function formatRelativeTime(dateString: string) {
  moment.loadPersian();
  return moment(dateString).locale('fa').fromNow();
}
