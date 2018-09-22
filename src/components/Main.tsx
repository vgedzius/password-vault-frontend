import * as React from 'react';

import Header from './Header';
import Router from './Router';
import LoginDialog from './LoginDialog';

export default class Main extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <Header />
        <Router />
        <LoginDialog />
      </React.Fragment>
    );
  }
}