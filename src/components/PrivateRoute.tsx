import * as React from 'react';
import { Route } from 'react-router';

import { AuthContext } from '../contexts/AuthContext';
import LoginForm from './LoginForm';

interface Props {
  component: React.ComponentClass;
  [key: string]: any;
}

export default ({ component: Component, ...rest }: Props) => (
  <AuthContext.Consumer>
    {(auth) => (
      <Route
        render={
          // tslint:disable-next-line:jsx-no-lambda
          props =>
            Boolean(auth.token)
              ? <Component {...props} />
              : <LoginForm />
        }
        {...rest}
      />
    )}
  </AuthContext.Consumer>
);