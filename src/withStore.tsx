import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { useGlobals } from '@storybook/preview-api';
import type { PartialStoryFn as StoryFunction, Renderer, StoryContext } from '@storybook/types';
import { KEY } from 'src/constants';

export const withStore = (
  StoryFn: StoryFunction<Renderer>,
  context: StoryContext<Renderer>,
) => {
  const [globals] = useGlobals();
  console.log('globals decorator', globals);
  const myAddon = globals[KEY];

  console.log('globals.reduxStore', globals.reduxStore);
  return (
    <Provider store={globals.reduxStore}>
      {StoryFn()}
    </Provider>
  );
};
