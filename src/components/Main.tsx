import * as React from 'react';

import Header from './Header';
import Router from './Router';

export default class Main extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <Header />
        <Router />
      </React.Fragment>
    );
  }
}