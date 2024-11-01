import { configureStore, combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit';
// @ts-expect-error need lodash types
import set from 'lodash.set';
import { Reducer } from './init';

export const updater = (state: any, action: any) => {
  const newState = {
    ...state
  }
  if (action.type === 'update') {
    if (Array.isArray(action.payload.data)) {
      action.payload.data.forEach(item => {
        const reducerKey = Object.keys(item);
        newState[reducerKey] = item[reducerKey]
      });
      return Reducer(newState, action);
    }
    const [key] = Object.keys(action.payload.data);
    newState[key] = action.payload.data[key];
    return Reducer(newState, action);
  }
  if (action.type === 'updateArg') {
    set(newState, action.payload.key, action.payload.value);
    newState[action.payload.key] = action.payload.data;
    return Reducer(newState, action);
  }
  if (action.type === 'remove') {
    if (Array.isArray(action.payload.data)) {
      action.payload.data.forEach(item => {
        const reducerKey = Object.keys(item);
        delete newState[reducerKey];
      });
      return Reducer(newState, action);
    }
  }
  return Reducer(newState, action);
};

export const mockAppStore = configureStore({
  reducer: (state, action) => updater(state, action),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  enhancers: getDefaultEnhancers => getDefaultEnhancers()
});
