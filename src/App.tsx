import * as React from 'react';
import { BrowserRouter } from 'react-router-dom'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Main from './components/Main';
import AuthProvider from './contexts/AuthContext';
import UsersProvider from './contexts/UsersContext';
import PasswordsProvider from './contexts/PasswordsContext';


const theme = createMuiTheme({
  // palette: {
  //   type: 'dark',
  // },
});

class App extends React.Component {
  public render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <AuthProvider loadingComponent={<div>Loading...</div>}>
            <UsersProvider>
              <PasswordsProvider>
                <Main />
              </PasswordsProvider>
            </UsersProvider>
          </AuthProvider>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
