import { createSlice } from "@reduxjs/toolkit";

interface SliceState {
  count: number;
}

const initialState: SliceState = { count: 0 };

const originalSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
  },
});

export const { increment, decrement } = originalSlice.actions;
export default originalSlice.reducer;
