import React, { useCallback, useState, FC } from "react";
import { useAddonState, useChannel } from "storybook/internal/manager-api";
import { STORY_CHANGED } from "storybook/internal/core-events";
import { EVENTS, STATE_ID_STORE } from "../constants";
import { parse } from "../utils/jsonHelper";
import ObjectEditor from "./ObjectEditor";

export const StateView = () => {
  const [state, setState] = useAddonState<any>(STATE_ID_STORE);

  const [initialized, setInitialized] = useState(false);

  // Каналы для получения и отправки событий
  const emit = useChannel({
    [EVENTS.ON_DISPATCH]: (event) => setState(parse(event.state)),
    [EVENTS.INIT]: (event) => {
      setInitialized(true);
      return setState(parse(event.state));
    },
    [STORY_CHANGED]: () => {
      setInitialized(false);
    },
  });

  const onChange = useCallback((newState) => {
    emit(EVENTS.SET_STATE, JSON.stringify(newState)); // Отправляем новое состояние в сторис
  }, []);

  if (!initialized) return <>Loading...</>;

  return <ObjectEditor value={state} onChange={onChange} />;
};
