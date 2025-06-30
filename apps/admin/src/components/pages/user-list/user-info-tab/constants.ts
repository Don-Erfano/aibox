import { strings } from '@/constant';
import { z } from 'zod';

export const userInfoSchema = z.object({
  first_name: z
    .string()
    .max(50, 'تعداد کاراکتر بیش از حد مجاز است.')
    .regex(
      /^[ آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ\u200c\s]+$/,
      'لطفا فقط از حروف فارسی و فاصله استفاده کنید.'
    )
    .optional()
    .or(z.literal('')),
  last_name: z
    .string()
    .max(50, 'تعداد کاراکتر بیش از حد مجاز است.')
    .regex(
      /^[ آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ\u200c\s]+$/,
      'لطفا فقط از حروف فارسی و فاصله استفاده کنید.'
    )
    .optional()
    .or(z.literal('')),
  nickname: z
    .string()
    .regex(
      /^[a-zA-Z_0-9]*$/i,
      'تنها از حروف انگلیسی و ـ میتوانید استفاده کنید.'
    )
    .refine((value) => !/test|admin|aibox/i.test(value), {
      message: 'استفاده از عبارت‌های خاص مثل test یا admin مجاز نیست.',
    })
    .optional(),
  email: z.string().email('فرمت ایمیل را به درستی و کامل وارد کنید.'),
  phone_number: z
    .string()
    .regex(/^[09][0-9]{10}$/, 'فرمت صحیح شماره موبایل: 09xxxxx1234')
    .optional()
    .or(z.literal('')),
  gender: z.string().optional(),
  is_active: z.string().optional(),
});

export const statusOptions = [
  { id: 'true', label: strings.active },
  { id: 'false', label: strings.deactive },
];

export const genderOptions = [
  { value: 'M', label: 'مرد' },
  { value: 'F', label: 'زن' },
  { value: 'U', label: 'نامشخص' },
];
