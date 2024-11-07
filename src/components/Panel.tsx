import React, { useCallback, useState, FC } from "react";
import { Button } from "storybook/internal/components";
import { useAddonState, useChannel } from "storybook/internal/manager-api";
import { styled, useTheme } from "storybook/internal/theming";

import { EVENTS, STATE_ID_STORE } from "../constants";
import ObjectEditor from "./ObjectEditor";
import { STORY_CHANGED } from "storybook/internal/core-events";
import { parse } from "../utils/jsonHelper";

const ObjectEditorWrapper: FC<{
  state: any;
  onChange: (value: any) => void;
}> = ({ state, onChange }) => {
  // useSetStateFromParameter();
  // useSyncReduxArgs(state);
  return (
    <>
      <ObjectEditor value={state} onChange={onChange} />
      <button onClick={() => onChange({ count: 1 })}>+</button>
    </>
  );
};

export const RequestDataButton = styled(Button)({
  marginTop: "1rem",
});

export const Panel = () => {
  const [state, setState] = useAddonState(STATE_ID_STORE);

  const [initialized, setInitialized] = useState(false);

  // Каналы для получения и отправки событий
  const emit = useChannel({
    [EVENTS.ON_DISPATCH]: (event) => setState(parse(event.state)),
    [EVENTS.INIT]: (event) => {
      setInitialized(true);
      return setState(parse(event.state));
    },
    // [EVENTS.SET_STATE]: (newState) => setState(parse(newState)),
    // [STORY_CHANGED]: () => {
    //   console.log("STORY CHANGED");

    //   setInitialized(false);
    // },
  });

  const onChange = useCallback((newState) => {
    console.log("NEW STATE", newState);
    emit(EVENTS.SET_STATE, JSON.stringify(newState)); // Отправляем новое состояние в сторис
  }, []);

  console.log("STATE", state);

  if (!initialized) return <>Loading...</>;

  return <ObjectEditorWrapper state={state} onChange={onChange} />;
};
