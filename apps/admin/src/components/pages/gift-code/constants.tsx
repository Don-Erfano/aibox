import { formatJalali } from '@aibox/ui';
import { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';

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

export const giftCodeSchema = z.object({
  code: z
    .string()
    .min(5, 'کد هدیه باید حداقل 5 کاراکتر باشد.')
    .max(10, 'کد هدیه باید حداکثر 10 کاراکتر باشد.'),
  amount: z
    .number()
    .min(1, 'وارد کردن مبلغ الزامی است.')
    .max(500000, 'مبلغ واردشده نباید بیشتر از 500,000 تومان باشد.'),
  allowed_count_use: z
    .number()
    .min(1, 'حداقل تعداد وارد شده باید 1 باشد.')
    .max(100, 'تعداد وارد شده نباید بیشتر از 100 باشد.')
    .optional(),
  expired_time: z.string(),
});
