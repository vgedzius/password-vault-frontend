import * as React from 'react';
import { Switch } from 'react-router';

import Passwords from './Passwords';
import Account from './Account';
import UsersPage from './UsersPage';
import PrivateRoute from './PrivateRoute';

export default class Router extends React.Component {
  public render() {
    return (
      <Switch>
        <PrivateRoute exact path="/" component={Passwords} />
        <PrivateRoute exact path="/account" component={Account} />
        <PrivateRoute exact path="/users" component={UsersPage} />
      </Switch>
    )
  }
}