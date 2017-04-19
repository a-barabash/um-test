import { createStore, applyMiddleware } from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'remote-redux-devtools';

import createReducers from './reducers';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}, history) {
  const middleware = [
    sagaMiddleware,
    routerMiddleware(history),
  ];

  const composeEnhancers = composeWithDevTools({ realtime: true, hostname: 'localhost', port: 8000 });

  return createStore(
    createReducers(),
    fromJS(initialState),
    composeEnhancers(applyMiddleware(...middleware)),
  );
}
