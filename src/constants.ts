export const ADDON_ID = "redux-state-addon";

export const PANEL_ID_HISTORY = `${ADDON_ID}/panel/history`;
export const PANEL_ID_STORE = `${ADDON_ID}/panel/store`;

export const STATE_ID_STORE = `${ADDON_ID}/useState/store`;
export const STATE_ID_HISTORY = `${ADDON_ID}/useState/history`;

export const PARAM_REDUX_MERGE_STATE = "PARAM_REDUX_MERGE_STATE";
export const ARG_REDUX_PATH = "ARG_REDUX_PATH";
export const ARG_REDUX_SET_STATE = "ARG_REDUX_SET_STATE";

export const ACTIONS_TYPES = {
  RESET_REDUX_TYPE: "@@WITH_RESET_REDUX",
  SET_STATE_TYPE: "@@WITH_REDUX_SET_STATE",
  SET_STATE_AT_PATH_TYPE: "@@SET_STATE_AT_PATH_TYPE",
};

export const EVENTS = {
  INIT: `${ADDON_ID}/init`,
  ON_DISPATCH: `${ADDON_ID}/on_dispatch`,
  SET_STATE: `${ADDON_ID}/set_state`,
  SET_STATE_AT_PATH: `${ADDON_ID}/set_state_at_path`,
  DISPATCH: `${ADDON_ID}/dispatch`,
};
