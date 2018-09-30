import * as React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom'

import Main from './components/Main';
import AuthProvider from './contexts/AuthContext';

const theme = createMuiTheme({
  
});

class App extends React.Component {
  public render() {
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <AuthProvider loadingComponent={<div>Loading...</div>}>
            <Main />
          </AuthProvider>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
