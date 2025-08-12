import React from "react";
import { addons, types } from "storybook/internal/manager-api";
import { AddonPanel } from "storybook/internal/components";
import { ADDON_ID, PANEL_ID_HISTORY, PANEL_ID_STORE } from "../constants";
import { StateView } from "../components/StateView";
import HistoryView from "../components/HistoryView";

/**
 * Note: if you want to use JSX in this file, rename it to `manager.tsx`
 * and update the entry prop in tsup.config.ts to use "src/manager.tsx",
 */

const StorePanel = (props: any) => (
  <AddonPanel {...props}>
    <StateView />
  </AddonPanel>
);

const HistoryPanel = (props: any) => (
  <AddonPanel {...props}>
    <HistoryView />
  </AddonPanel>
);

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID_STORE, {
    type: types.PANEL,
    title: "Redux Store",
    match: ({ viewMode }) => viewMode === "story",
    render: StorePanel,
  });

  addons.add(PANEL_ID_HISTORY, {
    type: types.PANEL,
    title: "Redux History",
    match: ({ viewMode }) => viewMode === "story",
    render: HistoryPanel,
  });
});
