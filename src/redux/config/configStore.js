import { configureStore } from "@reduxjs/toolkit";
import fanLetters from "../modules/fanLettersSlice";

const store = configureStore({
  reducer: {
    fanLetters,
  },
});

export default store;
