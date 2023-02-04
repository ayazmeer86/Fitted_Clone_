// import { createStore, applyMiddleware } from 'redux';
// import rootReducers  from "./reducers/index";
// import storage from require('redux-persist/lib/storage').default
// import ReduxThunk from 'redux-thunk'
// import { persistReducer, persistStore } from 'redux-persist'

// const persistConfig = {
//     key: 'root',
//     storage,
//   }

// const persistedReducer = persistReducer(persistConfig, rootReducers)
// const store = createStore(persistedReducer, applyMiddleware(ReduxThunk))
// const persistor = persistStore(store)
// export default store
// export {persistor}

import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer  from "./reducers";


let devtools, store;
const isClient = typeof window !== 'undefined';
if (isClient) {

//   devtools = (process.browser && window.__REDUX_DEVTOOLS_EXTENSION__)
//     ? window.__REDUX_DEVTOOLS_EXTENSION__()
//     : f => f

  const { persistStore, persistReducer } = require('redux-persist');
  const storage = require('redux-persist/lib/storage').default
  const persistConfig = {
    key: 'root',
    storage
  };

  store = createStore(
    persistReducer(persistConfig, rootReducer),
    applyMiddleware(thunk)
  );

  store.__PERSISTOR = persistStore(store);
} else {
  store = createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk)
    )
  );
}

export default store;