import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../store/originalSlice";

export const Child = () => {
  const state = useSelector((state) => state.app);
  const dispatch = useDispatch();

  return (
    <>
      <div>{state.count}</div>
      <div>{JSON.stringify(state)}</div>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </>
  );
};
