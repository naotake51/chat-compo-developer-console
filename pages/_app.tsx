import '../styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import { AuthContext } from '../contexts/auth-context';
import Layout from '../layouts/Layout';
import { client } from '../modules/apollo';
import { useAuth } from '../modules/use-auth';

function MyApp({ Component, pageProps }: AppProps) {
  const useAuthModule = useAuth();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => useAuthModule.initialize(), []);

  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={useAuthModule}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default MyApp;
