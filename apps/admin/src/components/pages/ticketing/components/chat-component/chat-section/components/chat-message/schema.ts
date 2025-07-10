import { z } from 'zod';

export const chatMessageSchema = z.object({
  message: z
    .string()
    .max(1000, 'پیام نمی‌تواند بیش از ۱۰۰۰ کاراکتر باشد')
    .trim(),
});

export type ChatMessageFormData = z.infer<typeof chatMessageSchema>;
