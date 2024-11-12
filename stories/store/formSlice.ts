import { createSlice } from "@reduxjs/toolkit";

interface FormState {
  name: string;
  surname: string;
}

const initialState: FormState = { name: "", surname: "" };

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setSurname: (state, action) => {
      state.surname = action.payload;
    },
  },
});

export const { setName, setSurname } = formSlice.actions;
export default formSlice.reducer;
