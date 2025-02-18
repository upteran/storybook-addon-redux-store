import {
  Reducer,
  StoreEnhancer,
  UnknownAction,
  StoreEnhancerStoreCreator,
  Dispatch,
} from "@reduxjs/toolkit";
import { ACTIONS_TYPES } from "../constants";
import set from "../utils/set";

type StateChangeListener = (
  action: UnknownAction,
  prevState: any,
  nextState: any,
) => void;

const setAtPathReducer: Reducer = (
  state,
  action: { type: string; path: string; value: string },
) => {
  return set(state, action.path, action.value);
};

const enhanceReducer =
  <S>(mainReducer: Reducer<S>) =>
  (state: S, action: UnknownAction) => {
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

export const enhancer: StoreEnhancer<any> =
  (createStore: StoreEnhancerStoreCreator) =>
  <S, A extends UnknownAction, PreloadedState>(
    reducer: Reducer<S, A>,
    initialState?: PreloadedState,
  ) => {
    const store = createStore(enhanceReducer(reducer as Reducer), initialState);

    let listener: StateChangeListener | null = null;

    const enhanceDispatch =
      (dispatch: Dispatch): Dispatch =>
      (action) => {
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
        listenToStateChange: (l: StateChangeListener) => (listener = l),
      },
    };

    _store = enhancedStore;

    return enhancedStore;
  };
