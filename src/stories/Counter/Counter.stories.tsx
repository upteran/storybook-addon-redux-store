import { Meta, StoryObj } from "@storybook/react";
import { Counter } from "./Counter";

const meta = {
  title: "Example/Counter",
  component: Counter,
  parameters: {
    initStore: {
      counter: {
        value: 2,
      },
    },
  },
} satisfies Meta<typeof Counter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
