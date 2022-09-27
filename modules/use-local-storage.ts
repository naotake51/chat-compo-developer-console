import { Dispatch, SetStateAction, useEffect, useState } from "react"

export const useLocalStorage = <S>(key: string, defaultValue: S): [S, Dispatch<SetStateAction<S>>] => {
    // window object does not exist during SSR
    const [value, setValue] = useState<S>(typeof window !== 'undefined' ? getInitValue() : defaultValue);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => setValue(getInitValue()), []);

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [value, setValue, key]);

    function getInitValue() {
        const jsonValue = window.localStorage.getItem(key);
        if (jsonValue === 'undefined') return undefined;
        if (jsonValue !== null) return JSON.parse(jsonValue);

        return defaultValue;
    }

    return [value, setValue];
}