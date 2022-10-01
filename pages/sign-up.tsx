/* eslint-disable react/jsx-handler-names */
import Link from 'next/link';
import { useRouter } from 'next/router';
import { InferProps } from 'prop-types';
import React, { useCallback, useContext, useState } from 'react';
import Button from '../components/atoms/Button/Button';
import InputCode from '../components/atoms/Input/InputCode';
import InputText from '../components/atoms/Input/InputText';
import Modal from '../components/molecules/Modal/Modal';
import { AuthContext } from '../contexts/auth-context';
import { useInputCode, useInputText } from '../modules/use-input';
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

  const codeModal = useModal({
    beforeOpen: () => {
      code.initialize();
    },
  });

  const [authEmail, setAuthEmail] = useState<AuthEmailToken | null>(null);

  const email = useInputText();

  const password = useInputText();

  const confirmPassword = useInputText();

  const isConfirmed = password.value === confirmPassword.value;

  const isValid = email.isNotEmpty && password.isNotEmpty && isConfirmed;

  const code = useInputCode(CODE_LENGTH, {
    beforeUpdate: (newValue) => {
      const codeString = newValue.join('');
      if (codeString.length !== CODE_LENGTH) return;

      try {
        // TODO:: Confirm code
        if (codeString !== 'ABCDEF') {
          throw new Error('mismatch');
        }
        codeModal.close();
        setAuthEmail({ email: email.value, token: '' });
      } catch (e) {
        const message = e instanceof Error ? e.message : 'system error';
        code.setErrorMessage(message);
      }
    },
  });

  const onSendCode = useCallback(() => {
    // TODO:: Send Code
    codeModal.open();
  }, [codeModal]);

  const onUseAnotherEmail = useCallback(() => {
    if (confirm('Use another email?')) {
      setAuthEmail(null);
    }
  }, []);

  const onSignUp = useCallback(async () => {
    try {
      if (!authEmail) throw new Error('unexpected');

      await signUp(email.value, password.value, authEmail.token);

      router.push('/');
    } catch (err) {
      alert('Sign up error');
    }
  }, [authEmail, email, password, router, signUp]);

  return (
    <div className='mt-6 flex flex-col items-center'>
      <form className='w-full max-w-md'>
        {!authEmail ? (
          <>
            <div className='p-2'>
              <InputText
                autoComplete='email'
                label='email'
                onUpdate={email.setValue}
                value={email.value}
              />
            </div>
            <div className='flex justify-end p-2'>
              <Button disabled={email.isEmpty} label='Send code' onClick={onSendCode} />
            </div>
            <Modal modal={codeModal} title='Please enter code'>
              <>
                <div className='h-8 text-red-500'>{code.errorMessage}</div>
                <InputCode onChange={code.setValue} value={code.value} />
              </>
            </Modal>
          </>
        ) : (
          <>
            <div className='p-2'>
              <InputText
                autoComplete='email'
                label='email'
                onChange={onUseAnotherEmail}
                value={email.value}
              />
            </div>
            <div className='p-2'>
              <InputText
                autoComplete='new-password'
                label='password'
                onUpdate={password.setValue}
                placeholder='8 characters or more'
                type='password'
                value={password.value}
              />
            </div>
            <div className='p-2'>
              <InputText
                autoComplete='new-password'
                label='confirm password'
                onUpdate={confirmPassword.setValue}
                type='password'
                value={confirmPassword.value}
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
