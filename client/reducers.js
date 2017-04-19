import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { REHYDRATE } from 'redux-persist/constants'

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

    case APP.CHARACTERS.SET_LIST_FILTER:
      return state.setIn(['characters', 'searchFilter'], action.filter);

    case APP.CHARACTERS.FAVORITE_STATE_CHANGED:
      return state.setIn(['characters', 'list', action.request.rowId, 'isFavorite'], action.request.state);

    case APP.CHARACTERS.SET_MODAL_SOURCE:
      return typeof action.rowId !== 'undefined' ?
        state.setIn(['characters', 'modal', 'source', 'rowId'], action.rowId) :
          state.deleteIn(['characters', 'modal', 'source']);

    case APP.CHARACTERS.SET_MODAL_ERRORS:
      return state.setIn(['characters', 'modal', 'errors'], fromJS(action.errors));

    case APP.CHARACTERS.SAVING:
    case APP.CHARACTERS.DELETING:
      return state.setIn(['characters', 'modal', 'progress', 'show'], action.status);

    case APP.CHARACTERS.SAVED:
      return action.request.source.rowId !== null ?
        state.setIn(['characters', 'list', action.request.source.rowId], fromJS(action.response.data)) :
          state.updateIn(['characters', 'list'], list => list.push(fromJS(action.response.data)));

    case APP.CHARACTERS.DELETED:
      return state.updateIn(['characters', 'list'], list => list.filter(doc => doc.get('_id') !== action.docId));

    case REHYDRATE:
      return typeof action.payload.app !== 'undefined' ?
        action.payload.app.mergeIn(['characters', 'modal'], fromJS({ progress: {}, errors: {}})) : state;

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
