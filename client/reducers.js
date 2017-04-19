import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import APP from './constants';

const routeInitialState = fromJS({
  locationBeforeTransitions: null,
});

function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload,
      });
    default:
      return state;
  }
}

const initialState = fromJS({
  loading: false,
  error: false,
  user: null,
});

function appReducer(state = initialState, action) {
  switch (action.type) {

    default:
      return state;
  }
}

export default function createReducers() {
  return combineReducers({
    route: routeReducer,
    global: appReducer,
  });
}
