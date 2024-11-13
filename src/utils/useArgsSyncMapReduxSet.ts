import { useRef } from "react";
import { useArgTypes } from "storybook/internal/manager-api";
import { Args, ArgTypes } from "storybook/internal/types";
import { ArgSyncSetEntry } from "../types";
import { ARG_REDUX_SET_STATE } from "../constants";

const syncEnabled = ([_name, data]: [string, any]): boolean =>
  data[ARG_REDUX_SET_STATE];

const useSyncMap = (): ArgSyncSetEntry[] => {
  const types = useArgTypes();
  const syncMapRef = useRef<ArgSyncSetEntry[]>([]);
  const typesRef = useRef<ArgTypes<Args>>();

  const typesChanged = typesRef.current !== types;
  if (typesRef.current !== types) {
    typesRef.current = types;
  }

  if (typesChanged) {
    syncMapRef.current = Object.entries(types)
      .filter(syncEnabled)
      .map(([name, data]) => ({ name, setter: data[ARG_REDUX_SET_STATE] })); // check if function
  }

  return syncMapRef.current;
};

export default useSyncMap;
