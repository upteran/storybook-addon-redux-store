import { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { Child } from './child';

const meta = {
  title: 'Example/MyComponent',
  component: Child,
  // decorators: [
  //   (story) => <Provider store={initStore()}>{story()}</Provider>
  // ],
  argTypes: {
    store: {
      redux: 'hello'
    }
  },
} satisfies Meta<typeof Child>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    initialState: {
      "count": {
        "x": 3
      }
    },
  }
};
