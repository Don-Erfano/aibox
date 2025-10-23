import { strings } from '@/constant';

enum EFilterValue {
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
}

const filterOptions = [
  {
    label: strings.weekly,
    value: EFilterValue.WEEKLY,
  },
  {
    label: strings.monthly,
    value: EFilterValue.MONTHLY,
  },
  {
    label: strings.yearly,
    value: EFilterValue.YEARLY,
  },
];

export { filterOptions, EFilterValue };
