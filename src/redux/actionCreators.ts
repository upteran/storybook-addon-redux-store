import { ActionCreator } from "redux";
import { ACTIONS_TYPES } from "../constants";

export const resetStateAction: ActionCreator<void> = () => ({
  type: ACTIONS_TYPES.RESET_REDUX_TYPE,
});

export const mergeStateAction: ActionCreator<any> = (state = {}) => ({
  type: ACTIONS_TYPES.MERGE_STATE_TYPE,
  state,
});

export const setStateAction: ActionCreator<any> = (state) => ({
  type: ACTIONS_TYPES.SET_STATE_TYPE,
  state,
});
