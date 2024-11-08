import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setName, setSurname } from "../store/formSlice";
import { decrement, increment } from "../store/counterSlice";

export const FormWithCounter = () => {
  const counter = useSelector((state) => state.counter);
  const form = useSelector((state) => state.form);
  const dispatch = useDispatch();

  return (
    <>
      <h2>Value is: {counter.count}</h2>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>

      <h2>Your name is: {form.name}</h2>
      <h2>Your surname is: {form.surname}</h2>

      <input
        type="text"
        value={form.name}
        onChange={(e) => dispatch(setName(e.target.value))}
        placeholder="name"
      />
      <input
        type="text"
        value={form.surname}
        onChange={(e) => dispatch(setSurname(e.target.value))}
        placeholder="surname"
      />
    </>
  );
};
