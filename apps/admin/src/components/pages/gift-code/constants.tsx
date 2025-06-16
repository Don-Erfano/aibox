import { formatJalali } from '@aibox/ui';
import { ColumnDef } from '@tanstack/react-table';

import { GiftCode } from '@/services/gift-code';

import { giftCodeStrings } from './strings';

export const giftCodeColumns: ColumnDef<GiftCode>[] = [
  {
    header: giftCodeStrings.giftCode,
    id: 'code',
    accessorKey: 'code',
    enableSorting: false,
    enableColumnFilter: true,
    meta: {
      label: '',
      placeholder: giftCodeStrings.giftCode,
      variant: 'text',
    },
  },
  {
    header: giftCodeStrings.tomanAmountValue,
    id: 'amount',
    accessorKey: 'amount',
    cell: ({ getValue }) => (getValue() as number).toLocaleString(),
  },
  {
    header: giftCodeStrings.expiredDate,
    id: 'expired_time',
    accessorKey: 'expired_time',
    cell: ({ getValue }) =>
      getValue() ? formatJalali(getValue() as string) : '—',
  },
  {
    header: giftCodeStrings.totalCapacity,
    id: 'allowed_count_use',
    accessorKey: 'allowed_count_use',
  },
  {
    header: giftCodeStrings.usedCapacity,
    id: 'count_user',
    accessorKey: 'count_user',
  },
  {
    header: giftCodeStrings.remainingCapacity,
    id: 'remain_count_use',
    accessorKey: 'remain_count_use',
  },
];
