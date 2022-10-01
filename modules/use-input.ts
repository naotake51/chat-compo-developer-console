import { useCallback, useState } from "react";

type UseInputOptions<T> = {
    beforeUpdate?: (newValue: T, oldValue: T) => void | boolean
}

const useInput = function <T>(initValue: T, { beforeUpdate }: UseInputOptions<T> = {}) {
    const [value, setValue] = useState<T>(initValue);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const initialize = useCallback(() => {
        setValue(initValue)
        setErrorMessage('')
    }, [initValue])

    const __setValue = useCallback((newValue: T) => {
        if (beforeUpdate) {
            const isPrevent = beforeUpdate(newValue, value);
            if (isPrevent === false) return
        }
        setValue(newValue)
    }, [beforeUpdate, value])

    return { value, setValue: __setValue, initialize, errorMessage, setErrorMessage };
};

export const useInputText = function (initValue: string = '', options: UseInputOptions<string> = {}) {
    const input = useInput(initValue, options);

    const isEmpty = !input.value

    const isNotEmpty = !!input.value

    return { ...input, isEmpty, isNotEmpty };
};

export const useInputCode = function (initValue: string[] | number, options: UseInputOptions<string[]> = {}) {
    const __initValue = typeof initValue === 'number' ? [...Array(initValue)].map((_) => '') : initValue;
    const input = useInput(__initValue, options);

    return { ...input };
};

