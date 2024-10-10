import { configureStore } from "@reduxjs/toolkit";
import destLatLangReducer from "./destLatLang/destLatLangSlice";

export default configureStore({
  reducer: {
    destLatLang: destLatLangReducer,
  },
});
