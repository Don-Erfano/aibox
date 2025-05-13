import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { ToggleGroup } from './toggle-group';

const toggleItems = [
  { label: 'روزانه', value: 'a' },
  { label: 'هفتگی', value: 'b' },
  { label: 'ماهانه', value: 'c' },
  { label: 'سالانه', value: 'd' },
  { label: 'ده هزار سال نوری', value: 'e' },
];

const ToggleGroupStory = () => {
  const [value, setValue] = useState('');

  return (
    <ToggleGroup items={toggleItems} selected={value} setSelected={setValue} />
  );
};

const meta: Meta<typeof ToggleGroupStory> = {
  component: ToggleGroupStory,
  title: 'ToggleGroup',
};

export default meta;

type Story = StoryObj<typeof ToggleGroupStory>;

export const General: Story = {};
