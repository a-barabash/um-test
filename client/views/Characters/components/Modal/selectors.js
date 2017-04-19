import { Map, List } from 'immutable';
import { createSelector } from 'reselect';

const stateSelector = state => state;

const selectSource = createSelector(
  stateSelector,
  (state) => {
    const path = ['app', 'characters', 'modal', 'source'];
    return state.hasIn(path) ? state.getIn(path) : Map();
  },
);

const selectCharacterData = createSelector(
  stateSelector,
  (state) => {
    const path = ['app', 'characters', 'modal', 'source'];
    const source = state.hasIn(path) ? state.getIn(path) : Map();

    if (source.size) {
      const rowId = source.get('rowId');
      if (rowId !== null) {
        const characterPath = ['app', 'characters', 'list', source.get('rowId')];
        return state.hasIn(characterPath) ? state.getIn(characterPath) : Map();
      } else {
        return state.getIn(['app', 'characters', 'template']);
      }
    }

    return Map();
  },
);

export default {
  selectSource,
  selectCharacterData,
};
