import {
  takeLatest, call, put, all, select,
} from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';

import history from '~/services/history';

import api from '~/services/api';

import { signInSuccess, getPermissionsSuccess } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;
    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    yield put(signInSuccess(response.data.token));
    api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
    history.push('/');
  } catch (err) {
    yield put(toastrActions.add({
      type: 'error',
      title: 'Falha no Login',
      message: 'Verifique seu e-mail ou senha',
      options: {
        showCloseButton: true,
        progressBar: true,
        timeOut: 5000,
      },
    }));
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;
    const response = yield call(api.post, 'users', {
      name,
      email,
      password,
    });

    yield put(signInSuccess(response.data.token));
    api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
    history.push('/');
  } catch (err) {
    yield put(toastrActions.add({
      type: 'error',
      title: 'Falha no Cadastro',
      message: 'Você foi convidado para algum time?',
      options: {
        showCloseButton: true,
        progressBar: true,
        timeOut: 5000,
      },
    }));
  }
}

export function setToken({ payload }) {
  if (!payload) return;
  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  window.location.href = '/signin';
}

export function* getPermissions() {
  const team = yield select((state) => state.teams.active);
  const signedIn = yield select((state) => state.auth.signedIn);

  if (!signedIn || !team) {
    return;
  }

  api.defaults.headers.common.TEAM = team.slug;

  try {
    const response = yield call(api.get, 'permissions');

    const { roles, permissions } = response.data;

    yield put(getPermissionsSuccess(roles, permissions));
  } catch (err) {
    console.log(err);
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('persist/REHYDRATE', getPermissions),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@teams/SELECT_TEAM', getPermissions),
]);
