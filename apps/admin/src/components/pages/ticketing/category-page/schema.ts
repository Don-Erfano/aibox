import { z } from 'zod';

export const categoryQuestionSchema = z.object({
  text: z.string(),
  parent: z.string(),
  key: z.string(),
  api: z.string(),
});

export const createCategorySchema = z.object({
  categoryName: z.string(),
  questions: z.array(categoryQuestionSchema).optional().default([]),
});

export const updateCategorySchema = createCategorySchema.extend({
  id: z.string(),
});

export type CreateCategoryFormData = z.infer<typeof createCategorySchema>;
