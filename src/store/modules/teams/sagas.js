import {
  takeLatest, call, put, all,
} from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';

import api from '~/services/api';

import { getTeamsSuccess, createTeamSuccess, closeTeamModal } from './actions';

export function* getTeams() {
  try {
    const response = yield call(api.get, 'teams');

    yield put(getTeamsSuccess(response.data));
  } catch (err) {
    yield put(toastrActions.add({
      type: 'error',
      title: 'Falha ao buscar equipes',
      message: 'Verifique sua conexão com internet',
      options: {
        showCloseButton: true,
        progressBar: true,
        timeOut: 5000,
      },
    }));
  }
}

export function setActiveRehydrate({ payload }) {
  if (!payload) return;
  const { active } = payload.teams;

  if (active) {
    api.defaults.headers.common.TEAM = active.slug;
  }
}

export function setActive({ payload }) {
  if (!payload) return;
  api.defaults.headers.common.TEAM = payload.team.slug;
}

export function* createTeam({ payload }) {
  const { name } = payload;
  try {
    const response = yield call(api.post, 'teams', { name });

    yield put(createTeamSuccess(response.data));
    yield put(closeTeamModal());
  } catch (err) {
    yield put(toastrActions.add({
      type: 'error',
      title: 'Erro na operação',
      message: 'Houve um erro, tente novamente',
      options: {
        showCloseButton: true,
        progressBar: true,
        timeOut: 5000,
      },
    }));
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setActiveRehydrate),
  takeLatest('@teams/CREATE_TEAM_REQUEST', createTeam),
  takeLatest('@teams/GET_TEAMS_REQUEST', getTeams),
  takeLatest('@teams/SELECT_TEAM', setActive),
]);
