// @ts-nocheck
import { Reducer } from "@reduxjs/toolkit";
import { ACTIONS_TYPES } from "../constants";
import set from "../utils/set";

const setAtPathReducer: Reducer = (state, action) => {
  return set(state, action.path, action.value);
};

const enhanceReducer = (mainReducer) => (state, action) => {
  switch (action.type) {
    case ACTIONS_TYPES.SET_STATE_AT_PATH_TYPE:
      return setAtPathReducer(state, action);
    case ACTIONS_TYPES.SET_STATE_TYPE:
      if (action.state === undefined) return mainReducer(undefined, action);
      return action.state;
    case ACTIONS_TYPES.RESET_REDUX_TYPE:
      return mainReducer(undefined, action);
    default:
      return mainReducer(state, action);
  }
};

let _store: any;

export const getStore = (): any => _store;

export const enhancer = (createStore) => (reducer, initialState) => {
  const store = createStore(enhanceReducer(reducer), initialState);

  let listener = null;

  const enhanceDispatch = (dispatch) => (action) => {
    const prev = store.getState();
    const result = dispatch(action);
    const next = store.getState();
    if (listener !== null) listener(action, prev, next);
    return result;
  };

  const enhancedStore = {
    ...store,
    dispatch: enhanceDispatch(store.dispatch),
    __WITH_REDUX_ENABLED__: {
      listenToStateChange: (l) => (listener = l),
    },
  };

  _store = enhancedStore;

  return enhancedStore;
};
