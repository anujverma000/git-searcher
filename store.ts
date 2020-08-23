import { useMemo } from 'react';
import { createStore } from 'redux';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reducer, {initialState} from './reducer'

let store

const initStore = (preloadedState = initialState) =>{
  return createStore(
    reducer,
    preloadedState,
  )
}

const persistConfig = {
  key: 'git-searcher',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducer)

const makeStore = (initialState) => {
  return createStore( persistedReducer, initialState)
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? makeStore(preloadedState)
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    store = undefined
  }

  if (typeof window === 'undefined') return _store
  if (!store) store = _store

  return _store
}

export const useStore = (initialState) => {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}