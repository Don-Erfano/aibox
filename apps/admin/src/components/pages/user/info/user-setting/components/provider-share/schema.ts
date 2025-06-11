import { z } from 'zod';

export const providerShareSchema = z.object({
  providerShare: z
    .number()
    .min(0, 'مقدار این فیلد کمتر از حد مجاز است.')
    .max(100, 'مقدار این فیلد بیش از حد مجاز است.'),
});
