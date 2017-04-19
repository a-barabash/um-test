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
  characters: {
    list: [],
    favoriteSwitcher: false,
    searchFilter: '',
    template: {
      name: '',
      height: '',
      mass: '',
      hair_color: '',
      skin_color: '',
      eye_color: '',
      birth_year: '',
      is_male: false
    }
  },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case APP.CHARACTERS.LIST_RECEIVED:
      return state.setIn(['characters', 'list'], fromJS(action.response.data));
    case APP.CHARACTERS.SET_FAVORITE_SWITCHER:
      return state.setIn(['characters', 'favoriteSwitcher'], action.state);
    case APP.CHARACTERS.FAVORITE_STATE_CHANGED:
      return state.setIn(['characters', 'list', action.request.rowId, 'isFavorite'], action.request.state);
    case APP.CHARACTERS.SET_MODAL_SOURCE:
      return typeof action.rowId !== 'undefined' ?
        state.setIn(['characters', 'modal', 'source', 'rowId'], action.rowId) :
          state.deleteIn(['characters', 'modal', 'source']);
    case APP.CHARACTERS.SAVED:
      return action.request.source.rowId !== null ?
        state.setIn(['characters', 'list', action.request.source.rowId], fromJS(action.response.data)) :
          state.updateIn(['characters', 'list'], list => list.push(fromJS(action.response.data)));
    default:
      return state;
  }
}

export default function createReducers() {
  return combineReducers({
    route: routeReducer,
    app: appReducer,
  });
}
