import { z } from 'zod';

export const assignTicketSchema = z
  .object({
    assign_me: z.boolean(),
    operator_id: z.string().optional(),
  })
  .refine((vals) => vals.assign_me || !!vals.operator_id, {
    message: 'انتخاب کاربر الزامی است',
    path: ['operator_id'],
  });

export type AssignTicketFormValues = z.infer<typeof assignTicketSchema>;

export const assignTicketDefaultValues: AssignTicketFormValues = {
  assign_me: true,
  operator_id: '',
};
