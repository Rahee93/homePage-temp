import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import sectionReducer from "./sections/sections.reducer";
import counterReducer from "./counter/counter.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["sections", "counter"],
};

const rootReducer = combineReducers({
  sections: sectionReducer,
  counter: counterReducer,
});

export default persistReducer(persistConfig, rootReducer);
