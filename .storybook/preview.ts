import type { Preview } from "@storybook/react";
import withReduxDecorator from "../src/redux/withReduxDecorator";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  initialGlobals: {
    background: { value: "light" },
  },
  decorators: [withReduxDecorator],
  loaders: [
    async () => ({
      store: await import("../stories/store/store"),
    }),
  ],
};

export default preview;
