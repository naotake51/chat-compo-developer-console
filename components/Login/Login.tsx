import { gql, useMutation } from '@apollo/client';
import { InferProps } from 'prop-types';
import React, { BaseSyntheticEvent, useCallback, useState } from 'react';
import Button from '../../atoms/Button/Button';
import InputText from '../../atoms/Input/InputText';

interface LoginArgs {
  email: string;
  password: string;
}

interface LoginResult {
  login: {
    developer: {
      email: string;
    };
    accessToken: string;
  };
}

Login.propTypes = {};

Login.defaultProps = {};

export default function Login({}: InferProps<typeof Login.propTypes>) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login, loginResult] = useMutation<LoginResult, LoginArgs>(
    gql`
      mutation ($email: String!, $password: String!) {
        login(loginInput: { email: $email, password: $password }) {
          developer {
            email
          }
          accessToken
        }
      }
    `,
    { variables: { email, password } },
  );

  const onLogin = useCallback(async () => {
    try {
      await login();
    } catch (err) {
      alert('Login error');
    }
  }, [login]);

  return (
    <div>
      <form>
        <InputText autocomplete='email' label='email' onChange={setEmail} value={email} />
        <InputText
          autocomplete='new-password'
          label='password'
          onChange={setPassword}
          type='password'
          value={password}
        />
      </form>
      <Button label='Login' onClick={onLogin} />
      {loginResult.data ? (
        <>
          <p>{loginResult.data.login.developer.email}</p>
          <p>{loginResult.data.login.accessToken}</p>
        </>
      ) : null}
    </div>
  );
}
