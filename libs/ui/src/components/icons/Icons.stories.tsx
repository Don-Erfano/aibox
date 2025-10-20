import type { Meta, StoryObj } from "@storybook/nextjs";
import IconGallery from "./IconGallery";

const meta = {
  title: "Icons",
  component: IconGallery,
  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],
} satisfies Meta<typeof IconGallery>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Icons: Story = {
  parameters: {
    design: {
      type: "figma",
    },
  },

  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: "#b8b8b8",
          padding: 20,
          borderRadius: 15,
        }}
      >
        <Story />
      </div>
    ),
  ],
};
