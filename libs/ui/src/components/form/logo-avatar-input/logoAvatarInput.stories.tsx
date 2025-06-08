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
    noImageSrc: { control: 'text' },
    isUploadButton: { control: 'boolean' },
    required: { control: 'boolean' },
    customStyles: { control: 'object' },
  },
};
export default meta;

type Story = StoryObj<typeof LogoAvatarInput>;

export const Default: Story = {
  args: {
    label: 'Your Logo',
    src: '',
    noImageSrc: '/src/assets/logoAvatarInput/new-no-image.svg',
    isUploadButton: false,
    required: false,
    customStyles: undefined,
  },
};

export const UploadMode: Story = {
  args: {
    label: 'Upload Logo',
    src: '',
    noImageSrc: '/src/assets/logoAvatarInput/new-no-image.svg',
    isUploadButton: true,
    required: true,
    customStyles: { width: '100px', height: '100px' },
  },
};
