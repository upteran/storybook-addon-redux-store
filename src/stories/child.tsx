import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./outerSlice";

export const Child = () => {
  const state = useSelector((state) => state);
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
