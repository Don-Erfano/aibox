import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { SearchBar } from './SearchBar';

const SearchBarPreview = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  return (
    <SearchBar
      open={open}
      toggleOpen={setOpen}
      value={value}
      onValueChange={setValue}
    />
  );
};

const meta: Meta<typeof SearchBar> = {
  component: SearchBarPreview,
  title: 'SearchBar',
};

export default meta;

type Story = StoryObj<typeof SearchBarPreview>;

export const Default: Story = {};
