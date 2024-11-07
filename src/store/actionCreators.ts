import { createAction } from "@reduxjs/toolkit";
import { ACTIONS_TYPES } from "../constants";

export const setStateAction = createAction<{ [key: string]: any }>(
  ACTIONS_TYPES.SET_STATE_TYPE,
);

export const resetStateAction = createAction(ACTIONS_TYPES.RESET_REDUX_TYPE);
