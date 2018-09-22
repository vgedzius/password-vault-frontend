import * as React from 'react';
import { Switch, Route } from 'react-router';

import Passwords from './Passwords';
import Account from './Account';

export default class Router extends React.Component {
  public render() {
    return (
      <Switch>
        <Route exact path="/" component={Passwords} />
        <Route exact path="/account" component={Account} />
      </Switch>
    )
  }
}