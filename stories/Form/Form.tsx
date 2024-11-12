import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setName, setSurname } from "../store/formSlice";

export const Form = () => {
  const form = useSelector((state) => state.form);
  const dispatch = useDispatch();

  return (
    <>
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
