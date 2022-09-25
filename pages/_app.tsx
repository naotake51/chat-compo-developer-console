import '../styles/globals.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import type { AppProps } from 'next/app';
import React, { useMemo, useState } from 'react';
import { AuthContext } from '../contexts/auth-context';
import Layout from '../layouts/Layout';
import { Auth } from '../types/auth';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  const [auth, setAuth] = useState<Auth | null>(null);

  const authValue = useMemo(() => {
    return { auth, setAuth };
  }, [auth, setAuth]);

  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={authValue}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default MyApp;
