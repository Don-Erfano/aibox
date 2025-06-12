import { z } from 'zod';

export const transactionFormSchema = z.object({
  status: z.enum(['done', 'fail']),
  kind: z.enum(['withdraw', 'deposit']),
  track_id: z.string().min(1, 'شماره تراکنش ضروری است'),
  description: z.string().optional(),
});
