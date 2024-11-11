import { useRef, useEffect } from "react";
import { useChannel, useParameter } from "storybook/internal/manager-api";
import { EVENTS, PARAM_REDUX_MERGE_STATE } from "../constants";
import { stringify } from "./jsonHelper";
import useStoryChanged from "./useStoryChanged";

const useSetStateFromParameter = (): void => {
  const emit = useChannel({});
  const mergeStateRef = useRef<string>("");
  const mergeState = useParameter<any>(PARAM_REDUX_MERGE_STATE, "");
  const storyChanged = useStoryChanged();

  useEffect(() => {
    const mergeStateChanged = mergeState !== mergeStateRef.current;

    mergeStateRef.current = mergeState;

    if (mergeState !== "" && (storyChanged || mergeStateChanged)) {
      emit(EVENTS.MERGE_STATE, stringify(mergeState));
    }
  }, [mergeState, storyChanged]);
};

export default useSetStateFromParameter;
