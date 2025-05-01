import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';
import { Mail } from 'lucide-react';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Button',
  argTypes: {
    variant: {
      control: 'select',
      options: ['general', 'form', 'icon'],
    },
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Login with Email',
    variant: 'outline',
    disabled: false,
    loading: false,
    size: 'icon',
    icon: <Mail />,
  },
};
