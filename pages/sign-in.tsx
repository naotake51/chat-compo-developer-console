/* eslint-disable react/jsx-handler-names */
import Link from 'next/link';
import { useRouter } from 'next/router';
import { InferProps } from 'prop-types';
import React, { useCallback, useContext } from 'react';
import Button from '../components/atoms/Button/Button';
import InputText from '../components/atoms/Input/InputText';
import { AuthContext } from '../contexts/auth-context';
import { useInputText } from '../modules/use-input';

SignIn.propTypes = {};

SignIn.defaultProps = {};

export default function SignIn({}: InferProps<typeof SignIn.propTypes>) {
  const router = useRouter();

  const { signIn } = useContext(AuthContext);

  const email = useInputText('test@example.com');

  const password = useInputText('password1234');

  const isValid = email.isNotEmpty && password.isNotEmpty && password.value.length >= 8;

  const onSignIn = useCallback(async () => {
    try {
      await signIn(email.value, password.value);

      router.push('');
    } catch (err) {
      alert('Sign in error');
    }
  }, [email, password, router, signIn]);

  return (
    <div className='mt-6 flex flex-col items-center'>
      <form className='w-full max-w-md'>
        <div className='p-2'>
          <InputText
            autoComplete='email'
            label='email'
            onUpdate={email.setValue}
            value={email.value}
          />
        </div>
        <div className='p-2'>
          <InputText
            autoComplete='new-password'
            label='password'
            onUpdate={password.setValue}
            type='password'
            value={password.value}
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
