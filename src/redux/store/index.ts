import { createStore, compose } from "redux"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import mainReducer from "../reducers"

const persistConfig = {
  key: "root",
  storage
}

const persistedReducer = persistReducer(persistConfig, mainReducer)

declare global {
  interface Window {
    _REDUX_DEVTOOLS_EXTENSION_COMPOSE_?: typeof compose
  }
}

const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose
export const store = createStore(persistedReducer, composeEnhancers())
export let persistor = persistStore(store)
export const dispatch = store.dispatch
