import type { Meta, StoryObj } from '@storybook/react';
import DatePicker from './DatePicker';
import { RhfDatePicker } from './rhf-date-picker';
import { Form } from '../form';
import { useForm } from 'react-hook-form';
import { Button } from '../button';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const meta: Meta<typeof DatePicker> = {
  component: DatePicker,
  title: 'DatePicker',
};
export default meta;
type Story = StoryObj<typeof DatePicker>;

export const General: Story = {
  args: {
    onChange: (e) => console.log(e),
  },
};
export const Range: Story = {
  args: {
    isMulti: true,
    onChange: (e) => console.log(e),
    max: '2025-06-29T00:00:00+03:30',
    label: 'لیبل',
  },
};

const FormSchema = z.object({
  dob: z
    .array(z.string())
    .max(2, { message: 'اشتباه' })
    .superRefine((data, ctx) => {
      console.log(new Date(data[0]).getTime());
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'error',
      });
    }),
});

export const Rhf: Story = {
  args: {},
  decorators: () => {
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        dob: ['2025-04-04T00:00:00+03:30'],
      },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
      console.log('You submitted the following values', {
        description: (
          <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <RhfDatePicker
            name="dob"
            control={form.control}
            label="date of birth"
            isMulti
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    );
  },
};
