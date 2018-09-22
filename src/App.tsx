import * as React from 'react';
import { BrowserRouter } from 'react-router-dom'

import Main from './components/Main';


class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    );
  }
}

export default App;
