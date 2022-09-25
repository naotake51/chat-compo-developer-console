import { createContext, Dispatch, SetStateAction } from 'react';
import { Auth } from '../types/auth';

type ContextData = {
    auth: Auth | undefined
    setAuth: Dispatch<SetStateAction<Auth | undefined>>
}

export const AuthContext = createContext<ContextData>({ auth: undefined, setAuth: () => { /** dummy */ } });