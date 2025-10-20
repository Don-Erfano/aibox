import { Meta, StoryObj } from '@storybook/react';
import Progressbar from './progressbar';

const meta: Meta<typeof Progressbar> = {
  title: 'progressbar',
  component: Progressbar,
  argTypes: {
    variant: {
      control: 'radio',
      options: ['incremental', 'decremental'],
    },
    size: {
      control: 'radio',
      options: ['thick', 'thin'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Progressbar>;

export const FourItems: Story = {
  args: {
    max: 100,
    min: 40,
    value: 40,
    variant: 'incremental',
    suffix: 'روز',
    size: 'thick',
  },
};
