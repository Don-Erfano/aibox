import { z } from 'zod';

const jalaliDateRegex =
  /^14[0-9]{2}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/;

export const publicMessageSchema = z.object({
  recivers: z
    .array(z.string().min(1, 'مقدار انتخاب لازم است'))
    .nullable()
    .refine((val) => val !== null, {
      message: 'لطفاً یک دریافت ‌کننده را انتخاب کنید',
    }),

  category: z
    .string(z.string().min(1, 'مقدار انتخاب لازم است'))
    .nullable()
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
    .optional()
    .or(z.literal('')),

  time_from: z
    .string()
    .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'ساعت باید در قالب HH:MM باشد'),

  time_to: z
    .string()
    .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'ساعت باید در قالب HH:MM باشد'),

  date_from: z
    .string()
    .regex(jalaliDateRegex, 'تاریخ باید در قالب ۱۴۰۰/۰۱/۰۱ باشد'),

  date_to: z
    .string()
    .regex(jalaliDateRegex, 'تاریخ باید در قالب ۱۴۰۰/۰۱/۰۱ باشد'),
});

export type PublicMessageSchemaType = z.infer<typeof publicMessageSchema>;

export const defaultValues: PublicMessageSchemaType = {
  recivers: [],
  message_subject: '',
  message_group: '',
  category: '',
  time_from: '',
  time_to: '',
  date_from: '',
  date_to: '',
};
