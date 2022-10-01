import '../styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';
import Template from '../components/template/Template';
import { AuthContext } from '../contexts/auth-context';
import { client } from '../modules/apollo';
import { useAuth } from '../modules/use-auth';

const authFreePaths: readonly string[] = ['/sign-in', '/sign-up'] as const;

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const useAuthModule = useAuth();

  const validPath = authFreePaths.includes(router.asPath) || useAuthModule.auth;
  if (!validPath) {
    router.push('/sign-in');
  }

  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={useAuthModule}>
        <Template>
          <Component {...pageProps} />
        </Template>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default dynamic(
  {
    loader: async () => MyApp,
  },
  { ssr: false },
);
