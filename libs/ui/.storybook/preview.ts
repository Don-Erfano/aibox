import { Preview } from '@storybook/react';
import '../global.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      values: [
        { name: 'dark', value: '#171A30' },
        { name: 'light', value: '#F2F2F2' },
      ],
      default: 'light',
    },
  },
};
export default preview;
