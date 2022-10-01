/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-array-index-key */
import PropTypes, { InferProps } from 'prop-types';
import React, { BaseSyntheticEvent, useCallback, useRef } from 'react';

InputCode.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

InputCode.defaultProps = {
  onChange: undefined,
};

export default function InputCode({ onChange, value }: InferProps<typeof InputCode.propTypes>) {
  const ref = useRef<HTMLDivElement>(null);

  const focusNextInput = (currentIdx: number) => {
    const inputs = ref.current?.children!;
    const currentInput = inputs[currentIdx] as HTMLInputElement;
    const nextInput = inputs[currentIdx + 1] as HTMLInputElement;

    if (nextInput) {
      nextInput.focus();
    } else {
      currentInput.blur();
    }
  };

  const focusPreviousInput = (currentIdx: number) => {
    const inputs = ref.current?.children!;
    const currentInput = inputs[currentIdx] as HTMLInputElement;
    const previousInput = inputs[currentIdx - 1] as HTMLInputElement;

    if (previousInput) {
      previousInput.focus();
    } else {
      currentInput.blur();
    }
  };

  const onKeyDownInput = useCallback(
    (event: BaseSyntheticEvent<KeyboardEvent, HTMLInputElement>, idx: number) => {
      event.preventDefault();

      let char: string | null = null;
      const key = event.nativeEvent.key;
      if (key.match(/^[A-Za-z0-9]$/)) {
        char = key.toLocaleUpperCase();
        focusNextInput(idx);
      } else if (key === 'Backspace') {
        char = '';
        focusPreviousInput(idx);
      } else {
        return;
      }

      const newValue = value.map((v, i) => (i === idx ? char : v));
      onChange && onChange(newValue);
    },
    [onChange, value],
  );

  return (
    <div className='flex justify-around gap-2' ref={ref}>
      {value.map((val, idx) => (
        <input
          className='aspect-square w-full flex-1 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-center text-3xl text-gray-900 caret-transparent focus:border-blue-500'
          key={idx}
          onChange={() => {}}
          onKeyDown={(event: BaseSyntheticEvent<KeyboardEvent, HTMLInputElement>) =>
            onKeyDownInput(event, idx)
          }
          required
          type='text'
          value={val}
        />
      ))}
    </div>
  );
}
