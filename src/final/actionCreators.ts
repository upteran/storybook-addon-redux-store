import { ActionCreator } from "redux";

import { ACTIONS_TYPES } from "../constants";

export const resetStateAction: ActionCreator<void> = () => ({
  type: ACTIONS_TYPES.RESET_REDUX_TYPE,
});

// export const mergeStateAction: ActionCreator<State> = (state = {}) => ({
//   type: ACTIONS_TYPES.MERGE_STATE_TYPE,
//   state
// })

export const setStateAction: ActionCreator<any> = (state) => ({
  type: ACTIONS_TYPES.SET_STATE_TYPE,
  state,
});

// export const setStateAtPathAction: ActionCreator<State> = (path: string, value: any) => ({
//   type: ACTIONS_TYPES.SET_STATE_AT_PATH_TYPE,
//   path,
//   value
// })
