import React from "react";
import { Provider } from "react-redux";
import { StoryFn } from "@storybook/react";
import { EVENTS } from "../constants";
import { useChannel } from "@storybook/preview-api";
import { STORY_CHANGED } from "storybook/internal/core-events";
import { parse } from "../utils/jsonHelper";
import { resetStateAction, setStateAction } from "./actionCreators";
import { Action, configureStore } from "@reduxjs/toolkit";
import extendReducer from "./extendReducer";
import originalSlice from "./originalSlice";

const withReduxDecorator = (initialState: any) => (Story: StoryFn) => {
  const store = configureStore({
    reducer: {
      app: extendReducer(originalSlice, initialState),
    },
  });

  const emit = useChannel({
    [EVENTS.SET_STATE]: (stateJson: string) =>
      // store.dispatch(setState(parse(stateJson))),
      store.dispatch(setStateAction(stateJson)),
    [EVENTS.DISPATCH]: (action: Action) => store.dispatch(action),
    [STORY_CHANGED]: () => store.dispatch(resetStateAction()),
  });

  // if (initialState) store.dispatch(setStateAction(initialState));

  // Отправка начального состояния при рендере истории
  emit(EVENTS.INIT, store.getState().app);

  return (
    <Provider store={store}>
      <Story />
    </Provider>
  );
};

export default withReduxDecorator;
