/**
 * App Store to handle
 *  - initializign the store on startup
 *  - preload store with data from persistent store
 *  - save data to persistent store
 */
import { useMemo } from "react";
import { createStore } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducer, { initialState } from "./reducer";

let store;

const initStore = (preloadedState = initialState) => {
  return createStore(reducer, preloadedState);
};

/**
 * Configs for the perisitent store, used by reducx-persist.
 */
const persistConfig = {
  key: "git-searcher",
  storage,
};

/**
 * Reducer for the persistent store
 */
const persistedReducer = persistReducer(persistConfig, reducer);

/**
 * Creates an new store with initial state
 * @param initialedState
 */
const makeStore = (initialedState) => {
  return createStore(persistedReducer, initialedState);
};

/**
 * Initialize store with preloaded data.
 * @param preloadedState
 */
export const initializeStore = (preloadedState) => {
  let newStore = store ?? makeStore(preloadedState);
  if (preloadedState && store) {
    // merge initial state and preloaded data from persistent store
    newStore = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    store = undefined;
  }

  // for server side
  if (typeof window === "undefined") return newStore;
  if (!store) store = newStore;

  return newStore;
};

/**
 * Custom hook to useStroe in the app.
 * @param initialedState Initial state of the app
 */
export const useStore = (initialedState) => {
  const memoStore = useMemo(() => initializeStore(initialedState), [
    initialedState,
  ]);
  return memoStore;
};
