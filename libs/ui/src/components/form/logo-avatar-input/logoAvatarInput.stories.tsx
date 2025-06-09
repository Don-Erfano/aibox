import type { Meta, StoryObj } from '@storybook/react';
import { LogoAvatarInput } from './logoAvatarInput';

const meta: Meta<typeof LogoAvatarInput> = {
  component: LogoAvatarInput,
  title: 'Components/LogoAvatarInput',
  argTypes: {
    onChange: { action: 'fileSelected' },
    onClick: { action: 'clicked' },
    label: { control: 'text' },
    src: { control: 'text' },
    mode: {
      control: { type: 'radio' },
      options: ['preview', 'upload'],
    },
    required: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof LogoAvatarInput>;

export const Default: Story = {
  args: {
    label: 'Your Logo',
    src: 'https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU',
    mode: 'preview',
    required: false,
  },
};

export const UploadExample: Story = {
  args: {
    label: 'Upload Logo',
    src: '',
    mode: 'upload',
    required: true,
  },
};
