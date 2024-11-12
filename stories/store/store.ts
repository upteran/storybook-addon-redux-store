import { configureStore } from "@reduxjs/toolkit";
import enhancer from "../../src/redux/enhancer";
import counterSlice from "./counterSlice";
import formSlice from "./formSlice";

const store = configureStore({
  reducer: {
    counter: counterSlice,
    form: formSlice,
  },
  enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(enhancer),
});

export default store;
