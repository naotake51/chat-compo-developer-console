import { gql } from '@apollo/client';
import { useState } from 'react';
import { Auth } from '../types/auth';
import { client } from './apollo';

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
    const [auth, setAuth] = useState<Auth>();

    const initialize = () => {
        const stored = localStorage.getItem('auth');
        setAuth(stored ? JSON.parse(stored) : undefined);
    }

    const signUp = async (email: string, password: string) => {
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
        const loginResult = result.data!.login;

        setAuth(loginResult);
        localStorage.setItem('auth', JSON.stringify(loginResult));
    }

    const signOut = () => {
        setAuth(undefined);
        localStorage.removeItem('auth');
    }

    return {
        auth,
        initialize,
        signUp,
        signOut,
    }
}