import { useRef } from "react";
import { useStorybookApi } from "storybook/internal/manager-api";

const s = (s: string | undefined): string => (s === undefined ? "" : s);

const useStoryChanged = (): boolean => {
  const api = useStorybookApi();
  const storyId = s(api.getUrlState().storyId);
  const storyIdRef = useRef<string>("");
  const storyChanged = storyId !== "" && storyIdRef.current !== storyId;
  storyIdRef.current = storyId;
  return storyChanged;
};

export default useStoryChanged;
