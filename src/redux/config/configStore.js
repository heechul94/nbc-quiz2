import { configureStore } from "@reduxjs/toolkit";
import fanLetters from "../modules/fanLettersSlice";
import user from "../modules/authSlice";

const store = configureStore({
  reducer: {
    fanLetters,
    user,
  },
});

export default store;
