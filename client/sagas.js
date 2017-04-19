import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import request from 'axios';

import APP from './constants';

export function* getList() {
  yield put({ type: APP.CHARACTERS.LIST_RECEIVING, receiving: true });
  try {
    const response = yield call(
      request.get,
      '/api/characters/list/',
    );
    yield put({ type: APP.CHARACTERS.LIST_RECEIVED, response });
  } catch (err) {
    yield put({ type: APP.CHARACTERS.LIST_RECEIVING_ERROR, error: err.message });
  } finally {
    yield put({ type: APP.CHARACTERS.LIST_RECEIVING, receiving: false });
  }
}

export function* setFavoriteState(action) {
  yield put({ type: APP.CHARACTERS.FAVORITE_STATE_CHANGING, receiving: true });
  try {
    const response = yield call(
      request.patch,
      `/api/characters/${action.docId}/set-favorite-state`,
      { state: action.state },
    );
    yield put({ type: APP.CHARACTERS.FAVORITE_STATE_CHANGED, response, request: action });
  } catch (err) {
    yield put({ type: APP.CHARACTERS.FAVORITE_STATE_CHANGING_ERROR, error: err.message });
  } finally {
    yield put({ type: APP.CHARACTERS.FAVORITE_STATE_CHANGING, receiving: false });
  }
}

export function* saveCharacter(action) {
  yield put({ type: APP.CHARACTERS.SAVING, receiving: true });
  try {
    const response = yield call(
      request.post,
      '/api/characters/save',
      { character: action.character },
    );
    yield put({ type: APP.CHARACTERS.SAVED, response, request: action });
    yield put({ type: APP.CHARACTERS.SET_MODAL_SOURCE});
  } catch (err) {
    yield put({ type: APP.CHARACTERS.SAVING_ERROR, error: err.message });
  } finally {
    yield put({ type: APP.CHARACTERS.SAVING, receiving: false });
  }
}

function* taskSagas() {
  yield [
    takeLatest(APP.CHARACTERS.GET_LIST, getList),
    takeLatest(APP.CHARACTERS.SET_FAVORITE_STATE, setFavoriteState),
    takeLatest(APP.CHARACTERS.SAVE, saveCharacter),
  ];
}

export default taskSagas;
