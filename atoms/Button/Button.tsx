import PropTypes, { InferProps } from 'prop-types';
import React from 'react';

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  onClick: undefined,
};

export default function Button({ onClick, label }: InferProps<typeof Button.propTypes>) {
  return (
    <button
      className='rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700'
      onClick={onClick ?? undefined}
      type='button'
    >
      {label}
    </button>
  );
}
