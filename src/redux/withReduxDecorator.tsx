import React, { useEffect } from "react";
import type { ComponentType } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { Action } from "@reduxjs/toolkit";
import { useChannel, useRef } from "storybook/preview-api";
// todo: using storybook types faced with memory leak on build step
// import type { StoryContext, StoryFn } from "@storybook/react";
import { StoreListener } from "../types";
import { EVENTS, PARAM_REDUX_MERGE_STATE } from "../constants";
import { differ } from "../utils/differ";
import { getRestrictedObject } from "../utils/getRestrictedObject";
import { parse } from "../utils/jsonHelper";
import { getStore } from "./enhancer";
import {
  resetStateAction,
  setStateAction,
  setStateAtPathAction,
} from "./actionCreators";

let nextId = 0;

export const withRedux =
  (Provider: typeof ReduxProvider) =>
  (
    Story: ComponentType<any>,
    context: { id: string; parameters: Record<string, any> },
  ) => {
    const storyId = context.id;
    const mergeStateRef = useRef("");

    const initialState = context.parameters[PARAM_REDUX_MERGE_STATE];

    const store = getStore();

    const emit = useChannel({
      [EVENTS.SET_STATE]: (stateJson: string) =>
        store.dispatch(
          setStateAction(
            initialState
              ? { ...store.getState(), ...parse(stateJson) }
              : parse(stateJson),
          ),
        ),
      [EVENTS.SET_STATE_AT_PATH]: (path: string, value: any) =>
        store.dispatch(setStateAtPathAction(path, value)),
      [EVENTS.DISPATCH]: (action: Action) => store.dispatch(action),
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

    useEffect(() => {
      const mergeStateChanged = initialState !== mergeStateRef.current;
      mergeStateRef.current = initialState;

      // Clearing state when changing history
      if (storyId) {
        store.dispatch(resetStateAction());
      }

      // Processing initial state
      if (initialState && mergeStateChanged) {
        store.dispatch(
          setStateAction({ ...store.getState(), ...initialState }),
        );
        emit(EVENTS.INIT, {
          state: JSON.stringify(initialState),
        });
      } else if (!initialState)
        emit(EVENTS.INIT, {
          state: JSON.stringify(store.getState()),
        });
    }, [storyId, initialState]);

    if (store.__WITH_REDUX_ENABLED__ === undefined)
      throw new Error("withRedux enhancer is not enabled in the store");

    store.__WITH_REDUX_ENABLED__?.listenToStateChange(onDispatchListener);

    return (
      <Provider store={store}>
        <Story />
      </Provider>
    );
  };
