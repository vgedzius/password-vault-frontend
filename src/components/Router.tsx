import * as React from 'react';
import { Switch } from 'react-router';

import PasswordsPage from './PasswordsPage';
import AccountPage from './AccountPage';
import UsersPage from './UsersPage';
import PrivateRoute from './PrivateRoute';

export default class Router extends React.Component {
  public render() {
    return (
      <Switch>
        <PrivateRoute exact path="/" component={PasswordsPage} />
        <PrivateRoute exact path="/account" component={AccountPage} />
        <PrivateRoute exact path="/users" component={UsersPage} />
      </Switch>
    )
  }
}