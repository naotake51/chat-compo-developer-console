import { gql, useMutation } from '@apollo/client';
import { InferProps } from 'prop-types';
import React, { useCallback, useState } from 'react';
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
    <div className='flex h-full w-full items-center justify-center'>
      <form className='max-w-md flex-1'>
        <div className='p-2'>
          <InputText autocomplete='email' label='email' onChange={setEmail} value={email} />
        </div>
        <div className='p-2'>
          <InputText
            autocomplete='new-password'
            label='password'
            onChange={setPassword}
            type='password'
            value={password}
          />
        </div>
        <div className='flex justify-end p-2'>
          <Button label='Login' onClick={onLogin} />
        </div>
      </form>
      {loginResult.data ? (
        <>
          <p>{loginResult.data.login.developer.email}</p>
          <p>{loginResult.data.login.accessToken}</p>
        </>
      ) : null}
    </div>
  );
}
