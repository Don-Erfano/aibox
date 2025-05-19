import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { SearchBar } from './search-bar';

const SearchBarPreview = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  return (
    <SearchBar
      value={value}
      onValueChange={setValue}
      open={open}
      toggleOpen={setOpen}
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
