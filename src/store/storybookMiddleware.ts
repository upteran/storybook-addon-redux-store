import { Middleware } from "redux";
import { EVENTS } from "../constants";

export const createStorybookMiddleware = (
  emit: (event: string, data: any) => void,
): Middleware => {
  return (storeAPI) => (next) => (action) => {
    const result = next(action);

    // Отправляем текущее состояние в Storybook после каждого экшена
    emit(EVENTS.SET_STATE, storeAPI.getState());

    return result;
  };
};
