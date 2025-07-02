import type { Meta, StoryObj } from '@storybook/react';
import Switch from './switch';
const meta: Meta<typeof Switch> = {
  component: Switch,
  title: 'form/Switch',
};
export default meta;
type Story = StoryObj<typeof Switch>;
export const General: Story = {
  args: {
    dir: 'rtl',
    loading: false,
    withIcon: false,
    variant: 'primary',
    disabled: false,
  },
};
