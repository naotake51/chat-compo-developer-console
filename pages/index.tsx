import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { useState } from 'react';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

export default function Index() {
  const [token, setToken] = useState('');

  client
    .mutate({
      mutation: gql`
        mutation {
          login(loginInput: { email: "test@example.com", password: "password1234" }) {
            developer {
              email
            }
            accessToken
          }
        }
      `,
    })
    .then((result) => setToken(result.data.login.accessToken))
    .catch((err) => console.log('Error', err));

  return (
    <div>
      <div>Token: {token}</div>
      {/* {users.map((user: any, i: number) => (
        <div key={i}>{user.name}</div>
      ))} */}
    </div>
  );
}
