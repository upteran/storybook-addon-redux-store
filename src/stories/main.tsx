import React from 'react';
import { Provider } from 'react-redux';
import { Child } from './child';
import { initStore } from './store';


export const Main = () => {
  return (
    <Provider store={initStore()}>
      <Child />
    </Provider>
  )
}
