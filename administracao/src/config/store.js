import {createStore, applyMiddleware} from 'redux';
//import ReduxPromise from 'redux-promise';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import * as storage from 'redux-storage';
//import createEngine from 'redux-storage-engine-localstorage';
import reducers from '../reducers';

const middleware = [];

// Logger middleware
const loggerMiddleware = createLogger({
  predicate: () => process.env.NODE_ENV==='development'
});

// Thunk middleware
middleware.push(thunkMiddleware);

// Redux Storage middleware
const wrappedReducer = storage.reducer(reducers);
//let engine = createEngine('my-save-key');
//const reduxStorageMiddleware = storage.createMiddleware(engine);
// DESCOMENTA A LINHA DE BAIXO PARA ATIVAR A PARTE DE COOKIES
//middleware.push(reduxStorageMiddleware);
//const loadStore = storage.createLoader(engine);

middleware.push(loggerMiddleware);

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

export function makeStore(callback){
  const store = createStoreWithMiddleware(wrappedReducer);
  //loadStore(store).then((newState) => {
  //  callback(null, newState);
  //}).catch(() => callback("Failed to load previous state.", null));
  return store;
}

/*
import reducers from '../reducers';

const loggerMiddleware = createLogger();

let store;

if (process.env.NODE_ENV === "development") {
  store = createStore(reducers, applyMiddleware(thunkMiddleware, loggerMiddleware));
} else {
  store = createStore(reducers, applyMiddleware(thunkMiddleware));
}
*/

//export default store;
