'use client';

import {
  Button,
  Form,
  RHFAutocomplete,
  RHFCheckbox,
  RHFInput,
  RHFRadioGroup,
} from '@aibox/ui';
import { SubmitHandler, useForm } from 'react-hook-form';
import { defaultValues, userSchema, UserSchemaType } from '../types/schema';
import { zodResolver } from '@hookform/resolvers/zod';

export const UITest = () => {
  const form = useForm<UserSchemaType>({
    resolver: zodResolver(userSchema),
    defaultValues: defaultValues,
  });

  const onSubmit: SubmitHandler<UserSchemaType> = (data) => {
    console.log('Form data:', data);
  };

  return (
    <div className="p-8 max-w-lg mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Example Test Form Page</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <RHFInput
            name="username"
            control={form.control}
            label="Username"
            description="Enter your user name."
            placeholder="johndoe"
          />

          <RHFInput
            name="email"
            control={form.control}
            label="Email"
            description="Enter your email address."
            type="email"
            placeholder="john@example.com"
          />

          <RHFAutocomplete
            name="notificationType"
            control={form.control}
            label="Notification Type"
            description="Choose how you'd like to be notified."
            options={[
              { value: 'all', label: 'All messages' },
              { value: 'mentions', label: 'Mentions only' },
              { value: 'none', label: 'None' },
            ]}
          />

          <RHFCheckbox
            name="agree"
            control={form.control}
            label="I agree to the terms and conditions"
            description="You must agree before submitting."
          />

          <RHFRadioGroup
            name="tags"
            control={form.control}
            label="Tags"
            description="Select relevant tags from the list."
            options={[
              { id: 'react', label: 'React' },
              { id: 'typescript', label: 'Typescript' },
              { id: 'radix', label: 'Radix' },
            ]}
          />

          <Button type="submit">ثبت</Button>
        </form>
      </Form>
    </div>
  );
};
