import { formatJalali } from '@aibox/ui';
import { ColumnDef } from '@tanstack/react-table';

import { strings } from '@/constant';
import { GiftCode } from '@/services/gift-code';

export const giftCodeColumns: ColumnDef<GiftCode>[] = [
  {
    header: strings.giftCode,
    id: 'code',
    accessorKey: 'code',
    enableSorting: false,
    enableColumnFilter: true,
    meta: {
      label: '',
      placeholder: strings.giftCode,
      variant: 'text',
    },
  },
  {
    header: strings.tomanAmountValue,
    id: 'amount',
    accessorKey: 'amount',
    cell: ({ getValue }) => (getValue() as number).toLocaleString(),
  },
  {
    header: strings.expiredDate,
    id: 'expired_time',
    accessorKey: 'expired_time',
    cell: ({ getValue }) =>
      getValue() ? formatJalali(getValue() as string) : '—',
  },
  {
    header: strings.totalCapacity,
    id: 'allowed_count_use',
    accessorKey: 'allowed_count_use',
  },
  {
    header: strings.usedCapacity,
    id: 'count_user',
    accessorKey: 'count_user',
  },
  {
    header: strings.remainingCapacity,
    id: 'remain_count_use',
    accessorKey: 'remain_count_use',
  },
];
