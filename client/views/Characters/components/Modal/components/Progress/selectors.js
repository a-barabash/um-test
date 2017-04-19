import { createSelector } from 'reselect';

const stateSelector = state => state;

const selectVisibility = createSelector(
  stateSelector,
  (state) => {
    const path = ['app', 'characters', 'modal', 'progress', 'show'];
    return state.hasIn(path) ? state.getIn(path) : false;
  },
);

export default {
  selectVisibility,
};
