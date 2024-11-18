import { useRef } from "react";
import { ArgSyncPathEntry } from "../types";
import { ARG_REDUX_PATH } from "../constants";
import { useArgTypes } from "storybook/internal/manager-api";
import { Args, ArgTypes } from "storybook/internal/types";

const syncEnabled = ([_name, data]: [string, any]): boolean =>
  data[ARG_REDUX_PATH];

const toString = (o: any): string => (o == null ? "" : o.toString());

const useSyncMap = (): ArgSyncPathEntry[] => {
  const types = useArgTypes();
  const syncMapRef = useRef<ArgSyncPathEntry[]>([]);
  const typesRef = useRef<ArgTypes<Args>>();

  const typesChanged = typesRef.current !== types;
  if (typesRef.current !== types) {
    typesRef.current = types;
  }

  if (typesChanged) {
    syncMapRef.current = Object.entries(types)
      .filter(syncEnabled)
      .map(([name, data]) => ({ name, path: toString(data[ARG_REDUX_PATH]) }));
  }

  return syncMapRef.current;
};

export default useSyncMap;
