import { Meta, StoryObj } from '@storybook/react';
import type { AibImageUploaderProps } from './interface';
import { AibImageUploader } from './index';

const meta = {
  title: 'Inputs/AibUploader',
  component: AibImageUploader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    accept: { control: 'text' },
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readOnly: { name: 'readOnly', control: 'boolean' },
    error: { control: 'boolean' },
    errorMessage: { control: 'text' },
    initialImageUrl: { control: 'object' },
    onFileChange: { action: 'fileChanged' },
  },
} satisfies Meta<typeof AibImageUploader>;

export default meta;
type Story = StoryObj<typeof meta>;

const commonArgs: Partial<AibImageUploaderProps> = {
  accept: 'image/*',
  multiple: false,
  disabled: false,
  readOnly: false,
  error: false,
  errorMessage: '',
  initialImageUrl: '',
};

export const Single: Story = {
  args: {
    ...commonArgs,
    multiple: false,
  },
};

export const Multiple: Story = {
  args: {
    ...commonArgs,
    multiple: true,
  },
};

export const Disabled: Story = {
  args: {
    ...commonArgs,
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    ...commonArgs,
    readOnly: true,
    initialImageUrl: 'https://via.placeholder.com/40',
  },
};

export const ErrorState: Story = {
  args: {
    ...commonArgs,
    error: true,
    errorMessage: 'پیام مرتبط با خطا',
  },
};

export const WithInitialImage: Story = {
  args: {
    ...commonArgs,
    initialImageUrl: 'https://via.placeholder.com/40',
  },
};

export const WithInitialImagesMultiple: Story = {
  args: {
    ...commonArgs,
    multiple: true,
    initialImageUrl: [
      'https://via.placeholder.com/40',
      'https://via.placeholder.com/40',
    ],
  },
};
