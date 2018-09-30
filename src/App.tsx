import * as React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter } from 'react-router-dom'

import Main from './components/Main';
import AuthProvider from './contexts/AuthContext';
import UsersProvider from './contexts/UsersContext';


const theme = createMuiTheme({
  
});

class App extends React.Component {
  public render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <AuthProvider loadingComponent={<div>Loading...</div>}>
            <UsersProvider>
              <Main />
            </UsersProvider>
          </AuthProvider>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
