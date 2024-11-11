import { Meta, StoryObj } from "@storybook/react";
import { ARG_REDUX_PATH, PARAM_REDUX_MERGE_STATE } from "../../constants";
import { Counter } from "./Counter";

const meta = {
  title: "Example/Counter",
  component: Counter,
  parameters: {
    [PARAM_REDUX_MERGE_STATE]: {
      counter: {
        count: 10,
      },
    },
  },
  argTypes: {
    counter: {
      control: { type: "number" },
      [ARG_REDUX_PATH]: "counter.count",
    },
  },
} satisfies Meta<typeof Counter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
