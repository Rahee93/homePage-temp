import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import sectionReducer from "./sections/sections.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["sections"],
};

const rootReducer = combineReducers({
  sections: sectionReducer
});

export default persistReducer(persistConfig, rootReducer);
