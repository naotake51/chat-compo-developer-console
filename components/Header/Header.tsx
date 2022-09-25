import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/auth-context';

export default function Header() {
  const { auth } = useContext(AuthContext);

  return (
    <header>
      <p>Header</p>
      {auth ? (
        <div>
          <p>{auth!.developer.email}</p>
          <p>{auth!.accessToken}</p>
        </div>
      ) : null}
    </header>
  );
}
