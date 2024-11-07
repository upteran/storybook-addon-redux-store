import { Meta, StoryObj } from "@storybook/react";
import { Child } from "./child";
import withReduxDecorator from "../store/withReduxDecorator";

const meta = {
  title: "Example/MyComponent",
  component: Child,
  parameters: {
    initStore: {
      counter: {
        value: 2,
      },
    },
  },
  // argTypes: {
  //   counterValue: {
  //     control: 'number',
  //     store: 'counter.value'
  //   },
  // },
} satisfies Meta<typeof Child>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    // counterValue: 4
  },
  // decorators: [
  //   withReduxDecorator({
  //     count: 10, // Пример начального состояния
  //   }),
  // ],
};
