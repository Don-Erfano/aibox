import React, { useEffect } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { useForm, FormProvider } from 'react-hook-form';
import { LogoAvatarInput } from './LogoAvatarInput'; // adjust path as needed
import { Size } from './interface';

type FormValues = {
  logo: string;
};

const meta: Meta<typeof LogoAvatarInput> = {
  title: 'Components/LogoAvatarInput',
  component: LogoAvatarInput,
  argTypes: {
    mode: {
      control: { type: 'radio' },
      options: ['preview', 'upload'],
    },
    size: {
      control: { type: 'radio' },
      options: ['small', 'large'] as Size[],
    },
    label: { control: 'text' },
    required: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof LogoAvatarInput>;

export const Preview: Story = {
  args: {
    mode: 'preview',
    src: 'https://placehold.co/100x100',
    label: 'Company Logo',
    required: true,
    size: 'small',
  },
  parameters: {
    controls: {
      include: ['mode', 'src', 'label', 'required', 'size', 'onClick'],
    },
  },
};

export const Upload: Story = {
  render: (args) => {
    const form = useForm<FormValues>({
      defaultValues: { logo: '' },
    });

    return (
      <FormProvider {...form}>
        <form>
          <LogoAvatarInput<FormValues>
            {...(args as Omit<
              typeof args,
              'mode' | 'control' | 'name' | 'onChange'
            >)}
            mode="upload"
            control={form.control}
            name="logo"
            onChange={args.onChange}
          />
        </form>
      </FormProvider>
    );
  },
  args: {
    label: 'Upload Logo',
    required: true,
    size: 'small',
  },
  parameters: {
    controls: {
      include: ['label', 'required', 'size', 'onClick'],
    },
  },
};

export const Error: Story = {
  render: (args) => {
    const form = useForm<FormValues>({
      defaultValues: { logo: '' },
      mode: 'onSubmit',
    });

    useEffect(() => {
      form.setError('logo', {
        type: 'required',
        message: 'Logo is required',
      });
    }, [form]);

    return (
      <FormProvider {...form}>
        <form>
          <LogoAvatarInput<FormValues>
            {...(args as Omit<typeof args, 'mode' | 'control' | 'name'>)}
            mode="upload"
            control={form.control}
            name="logo"
            required
          />
        </form>
      </FormProvider>
    );
  },
  args: {
    label: 'Upload Logo (Error)',
    size: 'small',
  },
  parameters: {
    controls: {
      include: ['label', 'size', 'onClick'],
    },
  },
};
