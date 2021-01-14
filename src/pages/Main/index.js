import React from 'react';

import { useSelector } from 'react-redux';

import TeamSwitcher from '~/components/TeamSwitcher';
import Projects from '~/components/Projects';
import { Container } from './styles';

function Main() {
  const { active } = useSelector((state) => state.teams);
  return (
    <Container>
      <TeamSwitcher />
      {active && (
        <Projects />
      )}
    </Container>
  );
}

export default Main;
