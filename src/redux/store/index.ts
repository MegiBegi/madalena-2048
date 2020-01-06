import { createStore, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import mainReducer from "../reducers";

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, mainReducer);

const composeEnhancers =
  process.env.DEBUG_ENV !== "production" &&
  typeof window === "object" &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

export const store = createStore(persistedReducer, composeEnhancers());
export let persistor = persistStore(store);
export const dispatch = store.dispatch;
