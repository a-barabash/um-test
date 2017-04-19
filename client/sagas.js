import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import request from 'axios';

import APP from './constants';

export function* getList() {
  yield put({ type: APP.CHARACTERS.LIST_RECEIVING, status: true });
  try {
    const response = yield call(
      request.get,
      '/api/characters/list/',
    );
    yield put({ type: APP.CHARACTERS.LIST_RECEIVED, response });
  } catch (err) {
    yield put({ type: APP.CHARACTERS.LIST_RECEIVING_ERROR, error: err.message });
  } finally {
    yield put({ type: APP.CHARACTERS.LIST_RECEIVING, status: false });
  }
}

export function* setFavoriteState(action) {
  yield put({ type: APP.CHARACTERS.FAVORITE_STATE_CHANGING, status: true });
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
    yield put({ type: APP.CHARACTERS.FAVORITE_STATE_CHANGING, status: false });
  }
}

export function* saveCharacter(action) {
  yield put({ type: APP.CHARACTERS.SAVING, status: true });
  yield call(delay, 1000);
  try {
    const response = yield call(
      request.post,
      '/api/characters/save',
      { character: action.character },
    );
    if (response.data.errors) {
      yield put({ type: APP.CHARACTERS.SET_MODAL_ERRORS, errors: response.data.errors });
    } else {
      yield put({ type: APP.CHARACTERS.SET_MODAL_SOURCE });
      yield put({ type: APP.CHARACTERS.SAVED, response, request: action });
      yield put({ type: APP.CHARACTERS.SET_MODAL_ERRORS, errors: {} });
    }
  } catch (err) {
    yield put({ type: APP.CHARACTERS.SAVING_ERROR, error: err.message });
  } finally {
    yield put({ type: APP.CHARACTERS.SAVING, status: false });
  }
}

export function* deleteCharacter(action) {
  yield put({ type: APP.CHARACTERS.DELETING, status: true });
  yield call(delay, 1000);
  try {
    const response = yield call(
      request.delete,
      `/api/characters/${action.docId}/delete`,
      { character: action.character },
    );
    yield put({ type: APP.CHARACTERS.DELETED, docId: action.docId });
    yield put({ type: APP.CHARACTERS.SET_MODAL_SOURCE });
  } catch (err) {
    yield put({ type: APP.CHARACTERS.DELETING_ERROR, error: err.message });
  } finally {
    yield put({ type: APP.CHARACTERS.DELETING, status: false });
  }
}


function* taskSagas() {
  yield [
    takeLatest(APP.CHARACTERS.GET_LIST, getList),
    takeLatest(APP.CHARACTERS.SET_FAVORITE_STATE, setFavoriteState),
    takeLatest(APP.CHARACTERS.SAVE, saveCharacter),
    takeLatest(APP.CHARACTERS.DELETE, deleteCharacter),
  ];
}

export default taskSagas;
