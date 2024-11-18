import { Action } from "@reduxjs/toolkit";
import { Args } from "storybook/internal/types";

export interface OnDispatchEvent {
  id: number;
  date: Date;
  action: Action;
  diff: string;
  prev: string;
  state: string;
}

export type StoreListener =
  | null
  | ((action: Action, prev: any, next: any) => void);

export interface ArgSyncPathEntry {
  name: string;
  path: string;
}

export interface ArgSyncSetEntry {
  name: string;
  setter: (argValue: any, argValues: Args, state: any) => any;
}
