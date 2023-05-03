import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { reducer as reduxFormReducer } from "redux-form";

const reducer = combineReducers({
  form: reduxFormReducer,
});

const store = configureStore({ reducer });

export default store;
