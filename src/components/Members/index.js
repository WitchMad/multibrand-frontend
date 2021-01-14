import React, { useEffect, useState } from 'react';

import Select from 'react-select';

import { useDispatch, useSelector } from 'react-redux';
import Modal from '~/components/Modal';
import Can from '~/components/Can';
import Button from '~/styles/components/Button';
import { MemberList, Invite } from './styles';

import api from '~/services/api';

import {
  closeMembersModal,
  getMembersRequest,
  updateMemberRequest,
  inviteMemberRequest,
} from '~/store/modules/members/actions';

function Members() {
  const [roles, setRoles] = useState([]);
  const [invite, setInvite] = useState([]);
  const dispatch = useDispatch();

  const { data: members } = useSelector((state) => state.members);

  useEffect(() => {
    dispatch(getMembersRequest());
  }, []);

  useEffect(() => {
    async function loadRoles() {
      const response = await api.get('roles');

      setRoles(response.data);
    }
    loadRoles();
  }, []);

  function handleRolesChange(id, rolesArr) {
    dispatch(updateMemberRequest(id, rolesArr));
  }

  async function handleInvite(e) {
    e.preventDefault();
    dispatch(inviteMemberRequest(invite));
    setInvite('');
  }

  return (
    <Modal size="big">
      <h1>Membros</h1>
      <Can checkPermission="invites-create">
        <Invite onSubmit={handleInvite}>
          <input type="email" name="invite" value={invite} onChange={(e) => setInvite(e.target.value)} placeholder="Convidar para o time" />
          <Button type="submit">Enviar</Button>
        </Invite>
      </Can>

      <form onSubmit={() => {}}>
        <MemberList>
          {members.map((member) => (
            <li key={member.id}>
              <strong>{member.user.name}</strong>
              <Can checkRole="administrator">
                {(can) => (
                  <Select
                    isMulti
                    isDisabled={!can}
                    value={member.roles}
                    options={roles}
                    getOptionLabel={(role) => role.name}
                    getOptionValue={(role) => role.id}
                    onChange={(value) => handleRolesChange(member.id, value)}
                  />
                )}
              </Can>
            </li>
          ))}
        </MemberList>

        <Button
          type="button"
          onClick={() => dispatch(closeMembersModal())}
          filled={false}
          color="gray"
        >
          Cancelar
        </Button>
      </form>
    </Modal>
  );
}

export default Members;
