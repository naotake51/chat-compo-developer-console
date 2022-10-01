import Link from 'next/link';
import { useRouter } from 'next/router';
import { InferProps } from 'prop-types';
import React, { useCallback, useContext, useState } from 'react';
import Button from '../components/atoms/Button/Button';
import InputCode from '../components/atoms/Input/InputCode';
import InputText from '../components/atoms/Input/InputText';
import Modal from '../components/molecules/Modal/Modal';
import { AuthContext } from '../contexts/auth-context';
import { useModal } from '../modules/use-modal';

SignUp.propTypes = {};

SignUp.defaultProps = {};

type AuthEmailToken = {
  email: string;
  token: string;
};

const CODE_LENGTH = 6 as const;

export default function SignUp({}: InferProps<typeof SignUp.propTypes>) {
  const router = useRouter();

  const { signUp } = useContext(AuthContext);

  const codeModal = useModal();

  const [authEmail, setAuthEmail] = useState<AuthEmailToken | null>(null);

  const [email, setEmail] = useState('');

  const initCode = [...Array(CODE_LENGTH)].map((_) => '');
  const [code, setCode] = useState(initCode);

  const [password, setPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');

  const onSendCode = useCallback(() => {
    codeModal.open();
  }, [codeModal]);

  const onChangeCode = useCallback(
    (newValue: string[]) => {
      setCode(newValue);

      const code = newValue.join('');
      if (code.length === CODE_LENGTH) {
        try {
          // TODO:: Send code
          if (code !== 'ABCDEF') {
            throw new Error('Send Code Error');
          }

          codeModal.close();
          setCode(initCode);

          setAuthEmail({ email: email, token: '' });
        } catch (e) {
          console.log('Invalid Code');
          setCode(initCode);
        }
      }
    },
    [codeModal, email, initCode],
  );

  const onSignUp = useCallback(async () => {
    try {
      if (!authEmail) throw new Error('unexpected');

      await signUp(email, password, authEmail.token);

      router.push('/');
    } catch (err) {
      alert('Sign up error');
    }
  }, [authEmail, email, password, router, signUp]);

  const onUseAnotherEmail = useCallback(() => {
    if (confirm('Use another email?')) {
      setAuthEmail(null);
    }
  }, []);

  const isConfirmed = password === confirmPassword;
  const isValid = email && password && isConfirmed;

  return (
    <div className='mt-6 flex flex-col items-center'>
      <form className='w-full max-w-md'>
        {!authEmail ? (
          <>
            <div className='p-2'>
              <InputText autocomplete='email' label='email' onChange={setEmail} value={email} />
            </div>
            <div className='flex justify-end p-2'>
              <Button disabled={!email} label='Send code' onClick={onSendCode} />
            </div>
            <Modal modal={codeModal} title='Please enter code'>
              <InputCode onChange={onChangeCode} value={code} />
            </Modal>
          </>
        ) : (
          <>
            <div className='p-2'>
              <InputText
                autocomplete='email'
                label='email'
                onChange={onUseAnotherEmail}
                value={email}
              />
            </div>
            <div className='p-2'>
              <InputText
                autocomplete='new-password'
                label='password'
                onChange={setPassword}
                placeholder='8 characters or more'
                type='password'
                value={password}
              />
            </div>
            <div className='p-2'>
              <InputText
                label='confirm password'
                onChange={setConfirmPassword}
                type='password'
                value={confirmPassword}
              />
            </div>
            <div className='flex justify-end p-2'>
              <Button disabled={!isValid} label='Sign up' onClick={onSignUp} />
            </div>
          </>
        )}
      </form>
      <div>
        <Link href='/sign-in'>
          <a>already created an account?</a>
        </Link>
      </div>
    </div>
  );
}
