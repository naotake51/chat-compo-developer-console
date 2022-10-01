/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unused-prop-types */
import PropTypes, { InferProps } from 'prop-types';
import React from 'react';

type ButtonDefaultProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

Button.propTypes = {
  label: PropTypes.string.isRequired,
};

Button.defaultProps = {};

export default function Button(props: InferProps<typeof Button.propTypes> & ButtonDefaultProps) {
  const { label, ...defaultProps } = props;
  return (
    <button
      {...defaultProps}
      className='m-2 rounded bg-blue-500 py-2 px-4 font-bold text-slate-50 hover:bg-blue-700 disabled:bg-slate-400'
      type='button'
    >
      {label}
    </button>
  );
}
