import { gql, useMutation } from '@apollo/client';

interface LoginArgs {
  email: string;
  password: string;
}

interface LoginResult {
  login: {
    developer: {
      email: string;
    };
    accessToken: string;
  };
}

export default function Index() {
  const [login, loginResult] = useMutation<LoginResult, LoginArgs>(
    gql`
      mutation ($email: String!, $password: String!) {
        login(loginInput: { email: $email, password: $password }) {
          developer {
            email
          }
          accessToken
        }
      }
    `,
    {
      variables: { email: 'test@example.com', password: 'password1234' },
    },
  );

  const onClickLoginButton = async () => {
    try {
      await login();
    } catch (err) {
      alert('Login error');
    }
  };

  return (
    <div>
      <button onClick={onClickLoginButton}>Login</button>
      {loginResult.data && (
        <>
          <p>{loginResult.data.login.developer.email}</p>
          <p>{loginResult.data.login.accessToken}</p>
        </>
      )}
    </div>
  );
}
