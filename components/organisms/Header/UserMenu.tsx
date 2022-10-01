/* eslint-disable react/forbid-component-props */
import { Menu, Transition } from '@headlessui/react';
import { InferProps } from 'prop-types';
import React, { Fragment, useCallback, useContext } from 'react';
import { AuthContext } from '../../../contexts/auth-context';
import UserImage from './UserImage';
import UserMenuItem from './UserMenuItem';

UserMenu.propTypes = {};

UserMenu.defaultProps = {};

export default function UserMenu({}: InferProps<typeof UserMenu.propTypes>) {
  const { auth, signOut } = useContext(AuthContext);

  const onShowUserProfile = useCallback(() => {}, []);
  const onSignOut = useCallback(() => signOut(), [signOut]);

  if (!auth) return null;

  return (
    <Menu as='div' className='relative m-2'>
      <Menu.Button className='flex items-center'>
        <UserImage src='/noimage-user.jpg' />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute right-0  mt-2 w-56 divide-y divide-gray-400 rounded bg-gray-500'>
          <UserMenuItem label={auth.developer.email} onClick={onShowUserProfile} />
          <UserMenuItem label='Sign out' onClick={onSignOut} />
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
