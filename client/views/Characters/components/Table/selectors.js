import { List } from 'immutable';
import { createSelector } from 'reselect';

const stateSelector = state => state;

const selectCharacters = createSelector(
  stateSelector,
  (state) => {
    const path = ['app', 'characters', 'list'];
    let list = List();

    if (state.hasIn(path)) {
      list = state.getIn(path).sort((a, b) => a.get('_id').localeCompare(b.get('_id')));

      if (state.hasIn(['app', 'characters', 'favoriteSwitcher'])) {
        const favoriteSwitcher = state.getIn(['app', 'characters', 'favoriteSwitcher']);

        if (favoriteSwitcher) {
          list = list.filter(character => character.get('isFavorite'));
        }
      }
    }

    return list;
  },
);

const selectFavoriteSwitcher = createSelector(
  stateSelector,
  (state) => {
    const path = ['app', 'characters', 'favoriteSwitcher'];
    return state.hasIn(path) ? state.getIn(path) : false;
  },
);

const selectSearchFilter = createSelector(
  stateSelector,
  (state) => {
    const path = ['app', 'characters', 'searchFilter'];
    return state.hasIn(path) ? state.getIn(path) : '';
  },
);

export default {
  selectCharacters,
  selectFavoriteSwitcher,
  selectSearchFilter,
};