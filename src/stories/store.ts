import { configureStore } from "@reduxjs/toolkit";
import enhancer from "../final/enhancer";
import outerSlice from "./outerSlice";

const store = configureStore({
  reducer: {
    counter: outerSlice,
  },
  enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(enhancer),
});

export default store;
