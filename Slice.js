import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    en: "Computer",
    tr: "Bilgisayar",
  },
  {
    en: "Pen",
    tr: "Kalem",
  },
];

const dictionarySlice = createSlice({
  name: "dictionary",
  initialState,
  reducers: {
    add: (state, action) => {
      const word = action.payload;
      state.push(word);
    },
  },
});

export const { add } = dictionarySlice.actions;
export default dictionarySlice.reducer;
