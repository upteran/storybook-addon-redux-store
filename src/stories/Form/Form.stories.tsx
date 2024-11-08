import { Meta, StoryObj } from "@storybook/react";
import { Form } from "./Form";

const meta = {
  title: "Example/Form",
  component: Form,
  parameters: {
    initialState: {
      form: {
        name: "John",
        surname: "Doe",
      },
    },
  },
} satisfies Meta<typeof Form>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
