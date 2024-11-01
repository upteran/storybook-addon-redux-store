import { createSlice } from "@reduxjs/toolkit";

// Create an initial slice that can be used as a default reducer
export const countSlice = createSlice({
  name: 'count',
  initialState: {
    x: 0,
  },
  reducers: {
    increment: (state) => {
      state.x += 1;
    },
    decrement: (state) => {
      state.x -= 1;
    },
    setValue: (state, action) => {
      state.x = action.payload;
    },
  },
});

// Action creators for the main slice
export const { increment, decrement, setValue } = countSlice.actions;
