export const ADDON_ID = "redux-toolkit-addon";
export const TOOL_ID = `${ADDON_ID}/tool`;
export const PANEL_ID = `${ADDON_ID}/panel`;
export const TAB_ID = `${ADDON_ID}/tab`;
export const KEY = `reduxToolkitAddon`;

export const STATE_ID_STORE = `${ADDON_ID}/useState/store`;

export const ACTIONS_TYPES = {
  RESET_REDUX_TYPE: "@@WITH_RESET_REDUX",
  // MERGE_STATE_TYPE: "@@WITH_REDUX_MERGE_STATE",
  SET_STATE_TYPE: "@@WITH_REDUX_SET_STATE",
  // SET_STATE_AT_PATH_TYPE: "@@SET_STATE_AT_PATH_TYPE",
};

export const EVENTS = {
  INIT: `${ADDON_ID}/init`,
  ON_DISPATCH: `${ADDON_ID}/on_dispatch`,
  SET_STATE: `${ADDON_ID}/set_state`,
  DISPATCH: `${ADDON_ID}/dispatch`,
};
