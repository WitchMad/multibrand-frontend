import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import Button from '~/styles/components/Button';
import { SignForm, Container } from '../styles';

import { signUpRequest } from '~/store/modules/auth/actions';

function SignUp() {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  function handleInputChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { name, email, password } = values;

    dispatch(signUpRequest(name, email, password));
  }

  return (
    <Container>
      <SignForm onSubmit={handleSubmit}>
        <h1>Boas vindas</h1>

        <span>NOME</span>
        <input name="name" value={values.name} onChange={handleInputChange} />

        <span>E-MAIL</span>
        <input type="email" name="email" value={values.email} onChange={handleInputChange} />

        <span>SENHA</span>
        <input type="password" name="password" value={values.password} onChange={handleInputChange} />

        <Button size="big" type="submit">Criar</Button>
      </SignForm>
    </Container>
  );
}

export default SignUp;
