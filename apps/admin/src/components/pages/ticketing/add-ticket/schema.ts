import { z } from 'zod';

export const ticketSchema = z.object({
  subject: z
    .string()
    .min(1, 'عنوان درخواست الزامی است')
    .max(100, 'عنوان خیلی طولانی است'),
  priority: z
    .union([z.literal(''), z.enum(['low', 'medium', 'high'])])
    .refine((value) => value !== '', {
      message: 'انتخاب اولویت الزامی است',
    }),

  category: z.string().min(1, 'دسته‌بندی الزامی است'),

  assignees: z.array(z.string()).min(1, 'انتخاب کاربر الزامی است'),
});

export type TicketSchemaType = z.input<typeof ticketSchema>;

export const defaultValues: TicketSchemaType = {
  subject: '',
  priority: '',
  category: '',
  assignees: [],
};
