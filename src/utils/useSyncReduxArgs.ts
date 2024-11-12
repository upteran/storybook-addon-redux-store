import { useRef } from "react";
import { useArgs, useChannel } from "storybook/internal/manager-api";
import { EVENTS } from "../constants";
import useArgsSyncMapReduxPath from "./useArgsSyncMapReduxPath";
import useArgsSyncMapReduxSet from "./useArgsSyncMapReduxSet";
import { stringify } from "./jsonHelper";

interface Entries {
  [name: string]: any;
}

const useSyncReduxArgs = (state: any): void => {
  const emit = useChannel({});
  const [args] = useArgs();
  const ref = useRef<Entries>({});
  const argSyncPathMap = useArgsSyncMapReduxPath();
  const argSyncSetMap = useArgsSyncMapReduxSet();

  argSyncPathMap.forEach((entry) => {
    const value = args[entry.name];
    if (value !== ref.current[entry.name]) {
      ref.current[entry.name] = value;
      setTimeout(() => emit(EVENTS.SET_STATE_AT_PATH, entry.path, value), 0);
    }
  });

  argSyncSetMap.forEach((entry) => {
    const value = args[entry.name];
    if (value !== ref.current[entry.name]) {
      ref.current[entry.name] = value;
      setTimeout(() => {
        const newState: any = entry.setter(value, args, state);
        emit(EVENTS.SET_STATE, stringify(newState));
      }, 0);
    }
  });
};

export default useSyncReduxArgs;
