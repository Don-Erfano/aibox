import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { SearchBar } from './search-bar';

const SearchBarPreview = () => {
  const [value, setValue] = useState('');

  return <SearchBar value={value} onValueChange={setValue} loading={false} />;
};

const meta: Meta<typeof SearchBar> = {
  component: SearchBarPreview,
  title: 'SearchBar',
};

export default meta;

type Story = StoryObj<typeof SearchBarPreview>;

export const Default: Story = {};
