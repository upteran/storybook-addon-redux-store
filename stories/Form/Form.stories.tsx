import { Meta, StoryObj } from "@storybook/react-vite";
import { ARG_REDUX_PATH, PARAM_REDUX_MERGE_STATE } from "../../src/constants";
import { Form } from "./Form";

const meta = {
  title: "Example/Form",
  component: Form,
  parameters: {
    [PARAM_REDUX_MERGE_STATE]: {
      form: {
        name: "John",
        surname: "Doe",
      },
    },
  },
  argTypes: {
    name: {
      control: { type: "text" },
      [ARG_REDUX_PATH]: "form.name",
    },
    surname: {
      control: { type: "text" },
      [ARG_REDUX_PATH]: "form.surname",
    },
  },
} satisfies Meta<typeof Form>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
