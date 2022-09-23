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
      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      onClick={onClick ?? undefined}
      type='button'
    >
      {label}
    </button>
  );
}