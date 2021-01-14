import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import {
  getProjectsRequest, openProjectModal, closeProjectModal, createProjectRequest,
} from '~/store/modules/projects/actions';
import { openMemberModal } from '~/store/modules/members/actions';

import { Container, Project } from './styles';
import Button from '~/styles/components/Button';
import Modal from '~/components/Modal';
import Members from '~/components/Members';
import Can from '~/components/Can';

function Projects() {
  const [newProject, setNewProject] = useState('');
  const { active } = useSelector((state) => state.teams);
  const { data: projects, projectModalOpen } = useSelector((state) => state.projects);
  const { membersModalOpen } = useSelector((state) => state.members);

  const dispatch = useDispatch();

  useEffect(() => {
    if (active) {
      dispatch(getProjectsRequest());
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createProjectRequest(newProject));
    setNewProject('');
  }

  return (
    <Container>
      <header>
        <h1>{active?.name}</h1>
        <div>
          <Can checkPermission="projects-create">
            <Button onClick={() => dispatch(openProjectModal())}>
              + Novo
            </Button>
          </Can>
          <Button onClick={() => dispatch(openMemberModal())}>
            Membros
          </Button>
        </div>
      </header>
      {projects.map((p) => (
        <Project key={p.id}>
          <p>{p.title}</p>
        </Project>
      ))}
      {projectModalOpen && (
        <Modal>
          <h1>Criar Projeto</h1>
          <form onSubmit={handleSubmit}>
            <span>NOME</span>
            <input name="newProject" value={newProject} onChange={(e) => setNewProject(e.target.value)} />
            <Button size="big" type="submit">
              Salvar
            </Button>
            <Button onClick={() => dispatch(closeProjectModal())} size="small" color="gray">
              Cancelar
            </Button>
          </form>
        </Modal>
      )}
      {membersModalOpen && (
        <Members />
      )}
    </Container>
  );
}

export default Projects;
