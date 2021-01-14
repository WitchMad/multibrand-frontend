import {
  takeLatest, call, put, all,
} from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';

import api from '~/services/api';

import { getMembersSuccess, createMemberSuccess } from './actions';

export function* getMembers() {
  try {
    const response = yield call(api.get, 'members');

    yield put(getMembersSuccess(response.data));
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

export function* createMember({ payload }) {
  try {
    const response = yield call(api.post, 'members', payload);

    yield put(createMemberSuccess(response.data));
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

export function* updateMember({ payload }) {
  const { id, roles } = payload;
  try {
    yield call(api.put, `members/${id}`, { roles: roles.map((role) => role.id) });
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

export function* inviteMember({ payload }) {
  try {
    yield call(api.post, 'invites', { invites: [payload.email] });
    yield put(toastrActions.add({
      type: 'success',
      title: 'Sucesso',
      message: 'Enviamos um convite para o usuário participar do time',
      options: {
        showCloseButton: true,
        progressBar: true,
        timeOut: 5000,
      },
    }));
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
  takeLatest('@members/GET_MEMBERS_REQUEST', getMembers),
  takeLatest('@members/CREATE_MEMBER_REQUEST', createMember),
  takeLatest('@members/UPDATE_MEMBER_REQUEST', updateMember),
  takeLatest('@members/INVITE_MEMBER_REQUEST', inviteMember),
]);
