import { configureStore } from "@reduxjs/toolkit";
import { countSlice } from './countSlice';

let store;

// Default reducers template with a "main" slice
export const reducersTemplate = {
  count: countSlice.reducer,
};

// Initialize the Redux store with default or provided reducers
export const initStore = (initialReducers = reducersTemplate) => {
  store = configureStore({
    reducer: initialReducers,
  });
  return store;
};
