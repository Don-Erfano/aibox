import { z } from 'zod';

const jalaliDateRegex =
  /^14[0-9]{2}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/;

// Schema definition
export const publicMessageSchema = z.object({
  recivers: z
    .object({
      label: z.string().min(1, 'برچسب انتخاب لازم است'),
      value: z.string().min(1, 'مقدار انتخاب لازم است'),
    })
    .nullable()
    .refine((val) => val !== null, {
      message: 'لطفاً یک دریافت‌کننده را انتخاب کنید',
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

  category: z
    .object({
      label: z.string(),
      value: z.string(),
    })
    .nullable()
    .refine((val) => val !== null, {
      message: 'لطفاً یک دسته‌بندی را انتخاب کنید',
    }),

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
  recivers: { label: 'همه کاربران', value: 'all_users' },
  message_subject: 'متن نوشته شده',
  message_group: 'پیام گروهی',
  category: { label: 'گزینه انتخاب شده', value: 'selected_category' },
  time_from: '12:24',
  time_to: '12:45',
  date_from: '1401/03/24',
  date_to: '1401/03/24',
};
