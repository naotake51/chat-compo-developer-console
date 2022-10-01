/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unused-prop-types */
import PropTypes, { InferProps } from 'prop-types';
import React, { useCallback } from 'react';

type InputDefaultProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

InputText.propTypes = {
  label: PropTypes.string.isRequired,
  onUpdate: PropTypes.func,
  value: PropTypes.string.isRequired,
};

InputText.defaultProps = {
  onUpdate: undefined,
};

export default function InputText(
  props: InferProps<typeof InputText.propTypes> & Omit<InputDefaultProps, 'value'>,
) {
  const { label, onChange, onUpdate, ...defaultProps } = props;

  const __onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      event.preventDefault();
      onChange && onChange(event);
      onUpdate && onUpdate(event.target.value);
    },
    [onUpdate],
  );

  return (
    <div>
      <label className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'>
        {label}
      </label>
      <input
        {...defaultProps}
        className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
        onChange={__onChange}
      />
    </div>
  );
}
