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

      const favoriteSwitcherPath = ['app', 'characters', 'favoriteSwitcher'];
      if (state.hasIn(favoriteSwitcherPath)) {
        const favoriteSwitcher = state.getIn(favoriteSwitcherPath);

        if (favoriteSwitcher) {
          list = list.filter(character => character.get('isFavorite'));
        }
      }

      const searchFilterPath = ['app', 'characters', 'searchFilter'];

      if (state.hasIn(searchFilterPath)) {
        const filter = state.getIn(searchFilterPath).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

        if (filter) {
          list = list.filter(character => character.get('name').search(new RegExp(filter, 'i')) !== -1);
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