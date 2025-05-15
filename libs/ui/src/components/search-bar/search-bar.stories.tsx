import type { Meta, StoryObj } from '@storybook/react';
import { NuqsAdapter } from 'nuqs/adapters/react';
import { useState } from 'react';

import { SearchBar } from './search-bar';

const SearchBarPreview = () => {
  const [open, setOpen] = useState(false);

  return (
    <NuqsAdapter>
      <SearchBar open={open} toggleOpen={setOpen} />
    </NuqsAdapter>
  );
};

const meta: Meta<typeof SearchBar> = {
  component: SearchBarPreview,
  title: 'SearchBar',
};

export default meta;

type Story = StoryObj<typeof SearchBarPreview>;

export const Default: Story = {};
