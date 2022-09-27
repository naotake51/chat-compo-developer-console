import React, { useCallback, useContext } from 'react';
import Button from '../../atoms/Button/Button';
import { AuthContext } from '../../contexts/auth-context';
import Logo from './Logo';

export default function Header() {
  const { auth, signOut } = useContext(AuthContext);

  const onSignOut = useCallback(() => signOut(), [signOut]);

  return (
    <header>
      <Logo />
      <p>Header</p>
      {auth ? (
        <div>
          <p>{auth!.developer.email}</p>
          <p>{auth!.accessToken}</p>
          <Button label='Sign out' onClick={onSignOut} />
        </div>
      ) : null}
    </header>
  );
}
