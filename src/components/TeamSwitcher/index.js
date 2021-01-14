import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  Container, TeamList, Team, NewTeam, Logout,
} from './styles';

import {
  getTeamsRequest, selectTeam, openTeamModal, closeTeamModal, createTeamRequest,
} from '~/store/modules/teams/actions';
import {
  signOut,
} from '~/store/modules/auth/actions';

import Button from '~/styles/components/Button';
import Modal from '~/components/Modal';

function TeamSwitcher() {
  const [newTeam, setNewTeam] = useState('');
  const dispatch = useDispatch();
  const { data: teams, teamModalOpen } = useSelector((state) => state.teams);

  useEffect(() => {
    dispatch(getTeamsRequest());
  }, []);

  function handleTeamSelect(team) {
    dispatch(selectTeam(team));
  }

  async function handleCreateTeam(e) {
    e.preventDefault();

    dispatch(createTeamRequest(newTeam));
  }

  return (
    <Container>
      <TeamList>
        {teams.map((team) => (
          <Team key={team.id} onClick={() => handleTeamSelect(team)}>
            <img alt={team.name} src={`https://ui-avatars.com/api/?font-size=0.33&background=7159c1&color=fff&name=${team.name}`} />
          </Team>
        ))}
        <NewTeam onClick={() => dispatch(openTeamModal())}>
          NOVO
        </NewTeam>

        {teamModalOpen && (
          <Modal>
            <h1>Criar time</h1>
            <form onSubmit={handleCreateTeam}>
              <span>NOME</span>
              <input name="newTeam" value={newTeam} onChange={(e) => setNewTeam(e.target.value)} />
              <Button size="big" type="submit">
                Salvar
              </Button>
              <Button size="small" type="button" onClick={() => dispatch(closeTeamModal())} color="gray">
                Cancelar
              </Button>
            </form>
          </Modal>
        )}
      </TeamList>
      <Logout onClick={() => dispatch(signOut())}>
        SAIR
      </Logout>
    </Container>
  );
}

export default TeamSwitcher;
