import { strings } from '@/constant';
import { UserLevels } from './types';

export const userAccessLevels: { id: UserLevels; label: string }[] = [
  { id: 'user', label: strings.user },
  { id: 'operator', label: strings.operator },
  { id: 'admin', label: strings.admin },
];
