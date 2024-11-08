import React from "react";
import { Provider } from "react-redux";
import { Action } from "@reduxjs/toolkit";
import { diff as differ } from "jsondiffpatch";
import { STORY_CHANGED } from "@storybook/core-events";
import { StoryFn } from "@storybook/react";
import { useChannel } from "@storybook/preview-api";
import { EVENTS } from "../constants";
import { parse } from "../utils/jsonHelper";
import { resetStateAction, setStateAction } from "./actionCreators";
import { getStore } from "./enhancer";

let nextId = 0;

const withReduxDecorator = (Story: StoryFn) => {
  const store = getStore();

  const emit = useChannel({
    [EVENTS.SET_STATE]: (stateJson: string) =>
      store.dispatch(setStateAction(parse(stateJson))),
    [EVENTS.DISPATCH]: (action: Action) => store.dispatch(action),
    [STORY_CHANGED]: (_action: Action) => store.dispatch(resetStateAction()),
  });

  const onDispatchListener = (action, prev, state): void => {
    const diff = differ(prev, state);
    const date = new Date();
    const event = {
      id: nextId++,
      date,
      action,
      diff: JSON.stringify(diff),
      prev: JSON.stringify(prev),
      state: JSON.stringify(state),
    };
    emit(EVENTS.ON_DISPATCH, event);
  };

  const initEvent = { state: JSON.stringify(store.getState()) };
  emit(EVENTS.INIT, initEvent);

  if (store.__WITH_REDUX_ENABLED__ === undefined)
    throw new Error("withRedux enhancer is not enabled in the store");

  store.__WITH_REDUX_ENABLED__?.listenToStateChange(onDispatchListener);

  return (
    <Provider store={store}>
      <Story />
    </Provider>
  );
};

export default withReduxDecorator;
