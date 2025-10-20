import { Meta, StoryObj } from '@storybook/react';
import CustomSwiper from './custom-swiper';

const meta: Meta<typeof CustomSwiper> = {
  component: CustomSwiper,
  title: 'Components/CustomSwiper',
  argTypes: {
    spaceBetween: {
      control: { type: 'number', min: 0, max: 50 },
    },
    navigation: { control: 'boolean' },
    pagination: { control: 'boolean' },
    autoplay: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof CustomSwiper>;

const SampleSlides = [
  <div className="flex h-60 items-center justify-center bg-blue-200" key={1}>
    Slide 1
  </div>,
  <div className="flex h-60 items-center justify-center bg-green-200" key={2}>
    Slide 2
  </div>,
  <div className="flex h-60 items-center justify-center bg-purple-200" key={3}>
    Slide 3
  </div>,
];

export const Default: Story = {
  args: {
    slides: SampleSlides,
  },
};

export const WithPagination: Story = {
  args: {
    slides: SampleSlides,
    pagination: true,
    navigation: false,
  },
};

export const WithAutoplay: Story = {
  args: {
    slides: SampleSlides,
    autoplay: true,
    spaceBetween: 20,
  },
};

export const MultipleSlides: Story = {
  args: {
    slides: SampleSlides,
    spaceBetween: 30,
  },
};
