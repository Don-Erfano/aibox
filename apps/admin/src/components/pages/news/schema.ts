import { z } from 'zod';

export const newsSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: 'عنوان باید حداقل ۳ کاراکتر باشد.',
    })
    .max(150, {
      message: 'عنوان نباید بیش از ۱۵۰ کاراکتر باشد.',
    }),

  thumbnail: z.string().optional(),

  tags: z
    .array(z.string())
    .max(5, { message: 'حداکثر ۵ تگ می‌توانید انتخاب کنید.' })
    .optional(),

  summary: z
    .string()
    .min(10, { message: 'خلاصه باید حداقل ۱۰ کاراکتر باشد.' })
    .max(300, { message: 'خلاصه نباید بیش از ۳۰۰ کاراکتر باشد.' }),

  uploader: z
    .any()
    .refine((val) => val !== undefined && val !== null && val !== '', {
      message: 'لطفا یک تصویر انتخاب کنید.',
    })
    .refine(
      (val) => {
        if (val instanceof File) {
          return val.size <= 5000000;
        }
        return true;
      },
      {
        message: 'حجم فایل نباید بیش از ۵ مگابایت باشد.',
      }
    ),

  slug: z
    .string()
    .max(60, { message: 'آدرس نباید بیش از ۶۰ کاراکتر باشد.' })
    .regex(/^[a-z0-9-]+$/, {
      message: 'آدرس باید فقط شامل حروف کوچک، اعداد و خط تیره باشد.',
    }),

  content: z.string().min(20, {
    message: 'شرح خبر حداقل باید ۲۰ کاراکتر باشد.',
  }),
});

export type NewsSchemaType = z.infer<typeof newsSchema>;

export const defaultValues: Partial<NewsSchemaType> = {
  content: '',
  slug: '',
  summary: '',
  title: '',
  tags: [],
};
