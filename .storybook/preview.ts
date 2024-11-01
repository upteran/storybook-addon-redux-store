import type { Preview } from "@storybook/react";
import { initStore } from '../src/stories/store';

const store = initStore();

function createStoreObserver(store) {
  return {

    // on will invoke the supplied callback every time the supplied predicate matches
    // the store's current state.  A function is returned which can be used to
    // unsubscribe this callback.
    on(predicate, callback) {
      const unsubscribe = store.subscribe(() => {
        if (predicate(store.getState)) {
          callback(store.getState);
        }
      });
      return unsubscribe;
    },

    // once will only invoke the supplied callback once when the predicate matches
    // the store's current state.  A function is returned which can be used to
    // unsubscribe early.
    once(predicate, callback) {
      const unsubscribe = store.subscribe(() => {
        if (predicate(store.getState)) {
          unsubscribe();
          callback(store.getState);
        }
      });
      return unsubscribe;
    }
  }
}

const x = createStoreObserver(store);

console.log('init time', x);

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
    reduxStore: x,
    reduxToolkitAddon: true
  },
};

export default preview;
