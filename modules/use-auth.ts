import { gql } from '@apollo/client';
import { Auth } from '../types/auth';
import { client } from './apollo';
import { useLocalStorage } from './use-local-storage';

type LoginArgs = {
    email: string;
    password: string;
};

type LoginResult = {
    signIn: {
        developer: {
            email: string;
        };
        accessToken: string;
    };
};

export function useAuth() {
    const [auth, setAuth] = useLocalStorage<Auth | null>('auth', null);

    const signIn = async (email: string, password: string) => {
        const result = await client.mutate<LoginResult, LoginArgs>({
            mutation: gql`
                mutation ($email: String!, $password: String!) {
                    signIn(signInInput: { email: $email, password: $password }) {
                        developer {
                          email
                        }
                        accessToken
                    }
                }
            `,
            variables: { email, password }
        });

        setAuth(result.data!.signIn);
    }

    const signOut = () => {
        setAuth(null);
    }

    return {
        auth,
        signIn,
        signOut,
    }
}