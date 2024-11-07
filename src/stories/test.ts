import { configureStore } from "@reduxjs/toolkit";
import outerSlice from "./outerSlice";
import enhancer from "../final/enhancer";

const store = configureStore({
  reducer: outerSlice,
  enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(enhancer),
});

export default store;
