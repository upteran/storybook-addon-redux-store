import { ACTIONS_TYPES } from "../constants";

const enhanceReducer = (mainReducer) => (state, action) => {
  switch (action.type) {
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

const enhancer = (createStore) => (reducer, initialState) => {
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

export default enhancer;
