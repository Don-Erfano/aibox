import { z } from 'zod';

const userSchema = z.object({
  username: z.string().min(1).max(20),
  email: z.string().email(),
  notificationType: z.enum(['all', 'mentions', 'none']),
  agree: z.boolean().refine((val) => val === true),
  tags: z.enum(['react', 'typescript', 'radix']),
});

const defaultValues: UserSchemaType = {
  username: '',
  email: '',
  notificationType: 'all',
  agree: false,
  tags: 'radix',
};

export type UserSchemaType = z.infer<typeof userSchema>;
export { defaultValues, userSchema };
