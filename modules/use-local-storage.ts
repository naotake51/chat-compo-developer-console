import { Dispatch, SetStateAction, useState } from "react"

export const useLocalStorage = <S>(key: string, defaultValue: S): [S, Dispatch<SetStateAction<S>>] => {
    const [value, setValue] = useState<S>(() => {
        const jsonValue = window.localStorage.getItem(key);
        if (jsonValue === 'undefined') return undefined;
        if (jsonValue !== null) return JSON.parse(jsonValue);

        return defaultValue;
    });

    const __setValue = (value: SetStateAction<S>) => {
        setValue(value)
        window.localStorage.setItem(key, JSON.stringify(value));
    }

    return [value, __setValue];
}