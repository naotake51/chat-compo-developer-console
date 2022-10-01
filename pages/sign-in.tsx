import Link from 'next/link';
import { useRouter } from 'next/router';
import { InferProps } from 'prop-types';
import React, { useCallback, useContext, useState } from 'react';
import Button from '../components/atoms/Button/Button';
import InputText from '../components/atoms/Input/InputText';
import { AuthContext } from '../contexts/auth-context';

SignIn.propTypes = {};

SignIn.defaultProps = {};

export default function SignIn({}: InferProps<typeof SignIn.propTypes>) {
  const router = useRouter();

  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password1234');

  const isValid = email && password && password.length >= 8;

  const onSignIn = useCallback(async () => {
    try {
      await signIn(email, password);

      router.push('/');
    } catch (err) {
      alert('Sign in error');
    }
  }, [email, password, router, signIn]);

  return (
    <div className='mt-6 flex flex-col items-center'>
      <form className='w-full max-w-md'>
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
          <Button disabled={!isValid} label='Sign in' onClick={onSignIn} />
        </div>
      </form>
      <div>
        <Link href='/sign-up'>
          <a>create an account?</a>
        </Link>
      </div>
    </div>
  );
}
