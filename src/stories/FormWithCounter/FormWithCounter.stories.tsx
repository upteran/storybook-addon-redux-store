import { Meta, StoryObj } from "@storybook/react";
import { FormWithCounter } from "./FormWithCounter";

const meta = {
  title: "Example/FormWithCounter",
  component: FormWithCounter,
  parameters: {
    initStore: {
      counter: {
        value: 2,
      },
    },
  },
} satisfies Meta<typeof FormWithCounter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
