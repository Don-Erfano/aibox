import { z, ZodType } from 'zod';

export const newsSchema = z.object({
  title: z.string().min(3, {
    message: 'عنوان باید حداقل ۳ کاراکتر باشد.',
  }),

  tags: z.array(z.string()).optional(),

  summary: z
    .string()
    .min(10, { message: 'خلاصه باید حداقل ۱۰ کاراکتر باشد.' })
    .max(300, { message: 'خلاصه نباید بیش از ۳۰۰ کاراکتر باشد.' }),

  thumbnail: z
    .any()
    .refine((file) => file instanceof File, {
      message: 'یک تصویر معتبر انتخاب کنید.',
    })
    .optional(),

  slug: z.string().regex(/^[a-z0-9-]+$/, {
    message: 'آدرس باید فقط شامل حروف کوچک، اعداد و خط تیره باشد.',
  }),

  content: z.string().min(20, {
    message: 'شرح خبر حداقل باید ۲۰ کاراکتر باشد.',
  }),
});

export type NewsSchemaType = z.infer<typeof newsSchema>;

export const defaultValues: NewsSchemaType = {
  content: '',
  slug: '',
  summary: '',
  title: '',
  tags: [],
};
