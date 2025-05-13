// Store.js
import { configureStore } from '@reduxjs/toolkit';
import dictionaryReducer from './Slice'; // 👈 slice'ı bu şekilde import etmelisin

export const store = configureStore({
  reducer: {
    dictionary: dictionaryReducer,
  },
});
