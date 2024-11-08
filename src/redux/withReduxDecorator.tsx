import React from "react";
import { Provider } from "react-redux";
import { Action } from "@reduxjs/toolkit";
import { diff as differ } from "jsondiffpatch";
import { STORY_CHANGED } from "@storybook/core-events";
import { StoryContext, StoryFn } from "@storybook/react";
import { useChannel } from "@storybook/preview-api";
import { StoreListener } from "../types";
import { EVENTS } from "../constants";
import { parse } from "../utils/jsonHelper";
import { resetStateAction, setStateAction } from "./actionCreators";
import { getStore } from "./enhancer";
import { getRestrictedObject } from "src/utils/getRestrictedObject";
import { replaceValuesIteratively } from "src/utils/replaceValuesIteratively";

let nextId = 0;

const withReduxDecorator = (Story: StoryFn, context: StoryContext) => {
  const initialState = context.parameters.initialState;

  const store = getStore();

  const emit = useChannel({
    [EVENTS.SET_STATE]: (stateJson: string) =>
      store.dispatch(setStateAction(parse(stateJson))),
    [EVENTS.DISPATCH]: (action: Action) => store.dispatch(action),
    [STORY_CHANGED]: (_action: Action) => store.dispatch(resetStateAction()),
  });

  const onDispatchListener: StoreListener = (action, prev, state): void => {
    const diff = differ(prev, state);
    const date = new Date();
    const restrictedPrev = initialState
      ? getRestrictedObject(prev, initialState)
      : prev;
    const restrictedState = initialState
      ? getRestrictedObject(state, initialState)
      : state;
    const event = {
      id: nextId++,
      date,
      action,
      diff: JSON.stringify(diff),
      prev: JSON.stringify(restrictedPrev),
      state: JSON.stringify(restrictedState),
    };
    emit(EVENTS.ON_DISPATCH, event);
  };

  if (initialState) {
    store.dispatch(
      setStateAction(replaceValuesIteratively(store.getState(), initialState)),
    );
    emit(EVENTS.INIT, {
      state: JSON.stringify(initialState),
    });
  } else
    emit(EVENTS.INIT, {
      state: JSON.stringify(store.getState()),
    });

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