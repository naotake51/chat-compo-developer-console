import { Menu } from '@headlessui/react';
import PropTypes, { InferProps } from 'prop-types';
import React from 'react';

UserMenuItem.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

UserMenuItem.defaultProps = {};

export default function UserMenuItem({
  label,
  onClick,
}: InferProps<typeof UserMenuItem.propTypes>) {
  const className = 'px-4 py-2 text-slate-50';
  const activeClassName = className + ' bg-gray-600';

  return (
    <Menu.Item>
      {({ active }) => (
        <div className={active ? activeClassName : className} onClick={onClick}>
          {label}
        </div>
      )}
    </Menu.Item>
  );
}
