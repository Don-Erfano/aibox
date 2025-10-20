import type { Meta, StoryObj } from '@storybook/react';

import { SearchBar } from './search-bar';

const SearchBarPreview = () => {
  return <SearchBar loading={false} />;
};

const meta: Meta<typeof SearchBar> = {
  component: SearchBarPreview,
  title: 'SearchBar',
};

export default meta;

type Story = StoryObj<typeof SearchBarPreview>;

export const Default: Story = {};
