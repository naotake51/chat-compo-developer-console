import { createContext } from 'react';
import { useAuth } from '../modules/use-auth'

type UseAuthReturn = ReturnType<typeof useAuth>

export const AuthContext = createContext<UseAuthReturn>({
    auth: null,
    signIn: async () => { /** dummy */ },
    signUp: async () => { /** dummy */ },
    signOut: async () => { /** dummy */ },
});