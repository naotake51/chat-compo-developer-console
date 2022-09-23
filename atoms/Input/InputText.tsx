import PropTypes, { InferProps } from 'prop-types';
import React, { BaseSyntheticEvent, useCallback } from 'react';

InputText.propTypes = {
  autocomplete: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(['text', 'password']),
  value: PropTypes.string,
};

InputText.defaultProps = {
  autocomplete: 'off',
  onChange: undefined,
  placeholder: undefined,
  type: 'text',
  value: undefined,
};

export default function InputText({
  autocomplete,
  label,
  onChange,
  placeholder,
  type,
  value,
}: InferProps<typeof InputText.propTypes>) {
  const __onChange = useCallback(
    (event: BaseSyntheticEvent) => {
      event.preventDefault();
      onChange && onChange(event.target.value);
    },
    [onChange],
  );

  return (
    <div>
      <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
        {label}
      </label>
      <input
        autoComplete={autocomplete ?? undefined}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        onChange={__onChange}
        placeholder={placeholder ?? undefined}
        required
        type={type ?? 'text'}
        value={value ?? undefined}
      />
    </div>
  );
}
