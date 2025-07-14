import { Meta, StoryObj } from '@storybook/react';
import CustomSwiper from './custom-swiper';

const meta: Meta<typeof CustomSwiper> = {
  component: CustomSwiper,
  title: 'Components/CustomSwiper',
  argTypes: {
    slidesPerView: {
      control: { type: 'number', min: 1, max: 5 },
    },
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
  <div className="h-60 bg-blue-200 flex items-center justify-center">
    Slide 1
  </div>,
  <div className="h-60 bg-green-200 flex items-center justify-center">
    Slide 2
  </div>,
  <div className="h-60 bg-purple-200 flex items-center justify-center">
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
    slidesPerView: 2,
    spaceBetween: 20,
  },
};

export const MultipleSlides: Story = {
  args: {
    slides: SampleSlides,
    slidesPerView: 3,
    spaceBetween: 30,
  },
};
