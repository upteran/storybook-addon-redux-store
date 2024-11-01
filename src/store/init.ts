import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { countSlice } from './slice';

let store;

// Default reducers template with a "main" slice
export const reducersMap = {
  counter: countSlice.reducer,
};

export const Reducer = combineReducers(reducersMap);

// Initialize the Redux store with default or provided reducers
export const initStore = (initialReducers = reducersMap) => {
  store = configureStore({
    reducer: initialReducers,
  });
  return store;
};
