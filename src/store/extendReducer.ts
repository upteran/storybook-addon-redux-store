import { PayloadAction, Reducer, UnknownAction } from "@reduxjs/toolkit";
import { setStateAction, resetStateAction } from "./actionCreators";

// Функция для расширения редьюсера общими экшенами
function extendReducer<S>(
  originalReducer: Reducer<S>,
  initialState: S,
): Reducer<S> {
  return (state = initialState, action: PayloadAction<any>): S => {
    switch (action.type) {
      case setStateAction.type:
        return action.payload;
      case resetStateAction.type:
        return initialState;
      default:
        // Обработка оригинального редьюсера для остальных экшенов
        return originalReducer(state, action);
    }
  };
}

export default extendReducer;
