import { UserLevels } from './types';

export const userAccessLevels: { id: UserLevels; label: string }[] = [
  { id: 'user', label: 'کاربر' },
  { id: 'operator', label: 'اپراتور' },
  { id: 'admin', label: 'ادمین' },
];
