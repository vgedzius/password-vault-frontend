import * as React from 'react';
import { BrowserRouter } from 'react-router-dom'

import Main from './components/Main';
import AuthProvider from './contexts/AuthContext';

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <AuthProvider loadingComponent={<div>Loading...</div>}>
          <Main />
        </AuthProvider>
      </BrowserRouter>
    );
  }
}

export default App;
