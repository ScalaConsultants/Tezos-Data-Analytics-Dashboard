import {createStore, combineReducers, applyMiddleware} from "redux";
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from "redux-devtools-extension";

import {blokchain} from './reducers/blokchain'

const rootReducer = combineReducers({
  blokchain
});

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  return {
    ...createStore(rootReducer,  composeWithDevTools(middleWareEnhancer)),
    runSaga: sagaMiddleware.run
  }
}
