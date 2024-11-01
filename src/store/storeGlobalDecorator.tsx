import { StoryFn, StoryContext } from '@storybook/react';
import React from 'react';
import { Provider } from 'react-redux';
import { useGlobals, useChannel } from '@storybook/preview-api';

export function storeGlobalDecorator(Story: StoryFn, context: StoryContext) {
  const { parameters, args, argTypes } = context;
  const [globals] = useGlobals();
  console.log('globals', globals)

  if (parameters.initStore) {
    globals.store.dispatch({
      type: 'update',
      payload: {
        data: parameters.initStore
      }
    });
  }
  Object.keys(argTypes).forEach(key => {
    if (argTypes[key].store) {
      if (
        Array.isArray(argTypes[key].store) &&
        typeof args[key] === 'boolean'
      ) {
        const isEnable = args[key];
        if (isEnable) {
          globals.store.dispatch({
            type: 'update',
            payload: {
              data: argTypes[key].store
            }
          });
        } else {
          globals.store.dispatch({
            type: 'remove',
            payload: {
              data: argTypes[key].store
            }
          });
        }
      } else if (argTypes[key].store && args[key]) {
        globals.store.dispatch({
          type: 'updateArg',
          payload: {
            key: argTypes[key].store,
            value: args[key]
          }
        });
      }
    }
  });

  return (
    <Provider store={globals.store}>
      <Story />
    </Provider>
  );
}
