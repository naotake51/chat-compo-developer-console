import { useRouter } from 'next/router';
import { InferProps } from 'prop-types';
import React, { useCallback, useContext, useState } from 'react';
import Button from '../atoms/Button/Button';
import InputText from '../atoms/Input/InputText';
import { AuthContext } from '../contexts/auth-context';

Login.propTypes = {};

Login.defaultProps = {};

export default function Login({}: InferProps<typeof Login.propTypes>) {
  const router = useRouter();

  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password1234');

  const onSignIn = useCallback(async () => {
    try {
      await signIn(email, password);

      router.push('/');
    } catch (err) {
      alert('Sign in error');
    }
  }, [email, password, signIn]);

  return (
    <div className='mt-6 flex h-full w-full items-center justify-center'>
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
          <Button label='Sign in' onClick={onSignIn} />
        </div>
      </form>
    </div>
  );
}
