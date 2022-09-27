import React from 'react';
import Logo from './Logo';
import UserMenu from './UserMenu';

export default function Header() {
  return (
    <header className='flex h-14 items-center justify-between bg-teal-600'>
      <Logo />
      <UserMenu />
    </header>
  );
}
