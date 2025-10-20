import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { Meta, StoryObj } from '@storybook/react';

import { Form } from '../form';
import RHFTextarea from './rhf-textarea';

const meta: Meta<typeof RHFTextarea> = {
  component: RHFTextarea,
  title: 'form/rhf-textarea',
};
export default meta;
type Story = StoryObj<typeof RHFTextarea>;

const schema = z.object({
  name: z.string({ message: 'گذرواژه اجباری‌ است' }).max(1, 'زیاد نوشتی'),
});

export const WithControl: Story = {
  args: {
    placeholder: 'placeholder',
    'aria-readonly': false,
    label: 'لیبل',
    maxLength: 200,
    required: true,
  },
  decorators: (Story, { args }) => {
    const form = useForm<z.infer<typeof schema>>({
      resolver: zodResolver(schema),
      mode: 'onChange',
      defaultValues: {
        name: '',
      },
    });
    return (
      <Form {...form}>
        <RHFTextarea {...args} control={form.control} name="name" />
      </Form>
    );
  },
};
