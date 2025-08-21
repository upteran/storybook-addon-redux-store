# Storybook Redux State Addon v.1.x

A Storybook addon that helps you manage and visualize Redux Toolkit state directly from Storybook's UI. This addon provides a powerful interface for debugging, manipulating, and tracking Redux state changes in your stories.

## Acknowledgments

This project was inspired by and builds upon the excellent work done in [addon-redux](https://github.com/frodare/addon-redux). Their original implementation provided the foundation for this addon.

## Features

- 🔍 Live Redux state inspection
- 📝 Direct state manipulation through a JSON editor
- 📊 Action history tracking with state diffs
- 🔄 State time-travel debugging
- 🎯 Control Redux state through Storybook controls
- 🔗 Path-based state binding
- 🔄 State persistence between story reloads

## Requirements

### Core Dependencies

- React >= 18.0.0
- Redux >= 4.0.0
- React Redux >= 9.0.0
- @reduxjs/toolkit >= 2.0.0
- Storybook >= 8.0.0

## Installation

```bash
npm install --save-dev storybook-addon-redux-store
```

## Setup

1. Register the addon in your `.storybook/main.ts`:

```ts
import type { StorybookConfig } from "@storybook/react";

const config: StorybookConfig = {
  addons: [
    // ... other addons
    "storybook-addon-redux-store",
  ],
};
export default config;
```

2. Add the Redux enhancer to your store:

```ts
import { configureStore } from "@reduxjs/toolkit";
import { enhancer } from "storybook-addon-redux-store";

const store = configureStore({
  reducer: {
    // your reducers
  },
  enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(enhancer),
});
```

3. Wrap your stories with the Redux Provider using the withRedux decorator:

```ts
// .storybook/preview.ts
import { Preview } from "@storybook/react";
import { Provider } from "react-redux";
import { withRedux } from "storybook-addon-redux-store";

const preview: Preview = {
  decorators: [withRedux(Provider)],
};
export default preview;
```

4. Import the store to your `.storybook/preview.ts`:

```ts
import { Preview } from "@storybook/react";
import { Provider } from "react-redux";
import { withRedux } from "storybook-addon-redux-store";

const preview: Preview = {
  decorators: [withRedux(Provider)],
  loaders: [
    async () => ({
      store: await import("./your/store"),
    }),
  ],
};
export default preview;
```

## Usage

### Basic State Control

You can control Redux state through story parameters:

```ts
import type { Meta } from "@storybook/react";
import { PARAM_REDUX_MERGE_STATE } from "storybook-addon-redux-store";
const meta: Meta = {
  title: "Components/MyComponent",
  parameters: {
    [PARAM_REDUX_MERGE_STATE]: {
      counter: {
        value: 42,
      },
    },
  },
};
export default meta;
```

### Binding Controls to State

You can bind Storybook controls directly to Redux state paths:

```ts
import { ARG_REDUX_PATH } from "storybook-addon-redux-store";
const meta: Meta = {
  title: "Components/MyComponent",
  argTypes: {
    count: {
      control: { type: "number" },
      [ARG_REDUX_PATH]: "counter.value",
    },
  },
};
```

## Features in Detail

### State Panel

The addon adds a "Redux Store" panel to Storybook's UI where you can:

- View the current Redux state
- Edit state values directly
- Reset state to initial values

### History Panel

The "Redux History" panel shows:

- A chronological list of dispatched actions
- State diffs for each action
- Previous and current state snapshots
- Ability to time-travel by loading previous states

## API Reference

### Parameters

- `PARAM_REDUX_MERGE_STATE`: Merges state with the initial Redux state
- `ARG_REDUX_PATH`: Binds a control to a specific Redux state path

### Exports

```ts
import {
  enhancer, // Redux store enhancer
  withRedux, // Storybook decorator
  PARAM_REDUX_MERGE_STATE,
  ARG_REDUX_PATH,
} from "storybook-addon-redux-store";
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License
