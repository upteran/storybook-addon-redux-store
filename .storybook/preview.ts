import type { Preview } from "@storybook/react";
import { withRedux } from "../src/redux/withReduxDecorator";
import { Provider } from "react-redux";

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
  decorators: [withRedux(Provider)],
  loaders: [
    async () => ({
      store: await import("../stories/store/store"),
    }),
  ],
};

export default preview;
