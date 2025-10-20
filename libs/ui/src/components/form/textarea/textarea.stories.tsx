import type { Meta, StoryObj } from '@storybook/react';

import Textarea from './textarea';

const meta: Meta<typeof Textarea> = {
  component: Textarea,
  title: 'form/textarea',
};
export default meta;
type Story = StoryObj<typeof Textarea>;

export const General: Story = {
  args: {
    placeholder: 'placeholder',
    'aria-readonly': false,
  },
};
