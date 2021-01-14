import {
  takeLatest, call, put, all,
} from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';

import api from '~/services/api';

import { getProjectsSuccess, createProjectSuccess } from './actions';

export function* getProjects() {
  try {
    const response = yield call(api.get, 'projects');

    yield put(getProjectsSuccess(response.data));
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

export function* createProject({ payload }) {
  try {
    const response = yield call(api.post, 'projects', payload);

    yield put(createProjectSuccess(response.data));
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
  takeLatest('@projects/GET_PROJECTS_REQUEST', getProjects),
  takeLatest('@teams/SELECT_TEAM', getProjects),
  takeLatest('@projects/CREATE_PROJECT_REQUEST', createProject),
]);
