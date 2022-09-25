import { createContext, Dispatch, SetStateAction } from 'react';
import { Auth } from '../types/auth';

type ContextData = {
    auth: Auth | null
    setAuth: Dispatch<SetStateAction<Auth | null>>
}

export const AuthContext = createContext<ContextData>({ auth: null, setAuth: () => { /** dummy */ } });