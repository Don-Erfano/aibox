import { z } from 'zod';

export const editDefaultMessageSchema = z.object({
  title: z.string().min(1, 'عنوان الزامی است'),
  message: z.string().min(1, 'متن پیام الزامی است'),
  category: z.string().min(1, 'دسته‌بندی الزامی است'),
});

export type EditDefaultMessageSchemaType = z.infer<
  typeof editDefaultMessageSchema
>;

export const defaultValues: EditDefaultMessageSchemaType = {
  title: '',
  message: '',
  category: '',
};
