import React from "react";
import { Provider } from "react-redux";
import { StoryFn } from "@storybook/react";
import store from "./test";

const testDecorator = (Story: StoryFn) => {
  return (
    <Provider store={store}>
      <Story />
    </Provider>
  );
};

export default testDecorator;
