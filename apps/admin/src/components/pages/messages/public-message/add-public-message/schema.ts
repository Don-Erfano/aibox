import { z } from 'zod';

export const publicMessageSchema = z.object({
  recivers: z
    .string()
    .min(1, 'مقدار انتخاب لازم است')
    .nullable()
    .refine((val) => val !== null, {
      message: 'لطفاً یک دریافت ‌کننده را انتخاب کنید',
    }),

  category: z
    .string()
    .min(1, 'مقدار انتخاب لازم است')
    .refine((val) => val !== null, {
      message: 'لطفاً یک دسته‌بندی را انتخاب کنید',
    }),

  message_subject: z
    .string()
    .min(3, 'موضوع پیام باید حداقل ۳ کاراکتر داشته باشد')
    .max(200, 'موضوع پیام نمی‌تواند بیشتر از ۲۰۰ کاراکتر باشد'),

  message_group: z
    .string()
    .max(100, 'نام پیام گروهی نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد')
    .optional(),

  time_from: z
    .string()
    .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'ساعت باید در قالب HH:MM باشد'),

  time_to: z
    .string()
    .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'ساعت باید در قالب HH:MM باشد'),

  date_from: z
    .array(z.string())
    .max(1, { message: 'اشتباه' })
    .superRefine((data, ctx) => {
      if (!data[0]) {
        return ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'wrong',
        });
      }
    }),

  date_to: z
    .array(z.string())
    .max(1, { message: 'اشتباه' })
    .superRefine((data, ctx) => {
      if (!data[0]) {
        return ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'wrong',
        });
      }
    }),
});

export type PublicMessageSchemaType = z.infer<typeof publicMessageSchema>;

export const defaultValues: PublicMessageSchemaType = {
  recivers: '',
  message_subject: '',
  message_group: '',
  category: '',
  time_from: '',
  time_to: '',
  date_from: [],
  date_to: [],
};
