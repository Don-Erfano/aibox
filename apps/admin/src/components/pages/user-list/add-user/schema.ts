import { z } from 'zod';

export const userSchema = z.object({
  email: z
    .string()
    .nonempty('ایمیل الزامی است')
    .email('فرمت ایمیل نامعتبر است'),
  password: z.string().min(6, 'کلمه عبور باید حداقل ۶ کاراکتر باشد'),
  accessLevel: z.enum(['user', 'operator', 'admin'], {
    errorMap: () => ({ message: 'انتخاب سطح دسترسی الزامی است' }),
  }),
});

export type UserSchemaType = z.infer<typeof userSchema>;

export const defaultValues: UserSchemaType = {
  email: '',
  password: '',
  accessLevel: 'user',
};
