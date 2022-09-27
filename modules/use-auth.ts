import { gql } from '@apollo/client';
import { Auth } from '../types/auth';
import { client } from './apollo';
import { useLocalStorage } from './use-local-storage';

type LoginArgs = {
    email: string;
    password: string;
};

type LoginResult = {
    login: {
        developer: {
            email: string;
        };
        accessToken: string;
    };
};

export function useAuth() {
    const [auth, setAuth] = useLocalStorage<Auth | undefined>('auth', undefined);

    const signIn = async (email: string, password: string) => {
        const result = await client.mutate<LoginResult, LoginArgs>({
            mutation: gql`
                mutation ($email: String!, $password: String!) {
                  login(loginInput: { email: $email, password: $password }) {
                    developer {
                      email
                    }
                    accessToken
                  }
                }
            `,
            variables: { email, password }
        });

        setAuth(result.data!.login);
    }

    const signOut = () => {
        setAuth(undefined);
    }

    return {
        auth,
        signIn,
        signOut,
    }
}