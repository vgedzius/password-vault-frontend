import * as React from 'react';
import axios from 'axios';

import Auth, { Credentials, ChangePasswordPayload } from '../servises/Auth';
import Users, { User } from '../servises/Users';
import { openSnackbar } from '../components/Notifier';

export interface AuthActions {
  actions: {
    login: (credentials: Credentials) => void,
    logout: () => void,
    update: (user: User) => void,
    changePassword: (payload: ChangePasswordPayload) => void,
  };
}

export interface AuthContextState {
  loading: boolean;
  user?: User;
  token?: string;
  userId?: string;
  error?: string;
}

export interface AuthProviderProps {
  loadingComponent: React.ReactNode;
}

export const AuthContext = React.createContext<AuthContextState & AuthActions>({
  loading: false,
  actions: {
    login: () => { },
    logout: () => { },
    update: () => { },
    changePassword: () => { },
  },
});

export default class AuthProvider extends React.Component<AuthProviderProps, AuthContextState> {
  private persist = false;
  private loaded = false;

  public componentWillMount() {
    const token = localStorage.getItem('token') || undefined;
    const userId = localStorage.getItem('userId') || undefined;

    if (token) {
      this.persist = true;
      axios.defaults.headers.common.Authorization = token;
    }

    this.setState({
      loading: false,
      token,
      userId,
    });
  }

  public componentDidMount() {
    const { token, userId } = this.state;

    if (token && userId) {
      this.setState({
        loading: true,
      });
      Users.get(userId)
        .then(user => {
          this.loaded = true;
          this.setState({
            loading: false,
            user
          })
        })
        .catch(error => {
          this.loaded = true;
          this.setState({
            loading: false,
            error: error.message,
          })
        });
    } else {
      this.loaded = true;
      this.setState({
        loading: false,
        token,
        userId,
      });
    }
  }

  public componentDidUpdate() {
    const { token } = this.state;

    if (this.persist && token) {
      localStorage.setItem('token', this.state.token || '');
      localStorage.setItem('userId', this.state.userId || '');
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    }
  }

  public render() {
    const { children, loadingComponent } = this.props;
    const value = {
      ...this.state,
      actions: {
        login: this.login,
        logout: this.logout,
        update: this.update,
        changePassword: this.changePassword,
      }
    }

    return (
      <AuthContext.Provider value={value}>
        {this.loaded ? children : loadingComponent}
      </AuthContext.Provider>
    );
  }

  private login = (credentials: Credentials) => {
    this.setState({
      loading: true,
    });

    Auth.login(credentials)
      .then(auth => {
        localStorage.removeItem('token');
        this.persist = credentials.persist || false;

        this.setState({
          loading: false,
          token: auth.token,
          userId: auth.userId,
          user: auth.user,
        });
      })
      .catch(error => {
        openSnackbar(error.message);

        this.setState({
          loading: false,
          error: error.message,
        })
      });
  }

  private logout = () => {
    this.setState({
      token: undefined,
      userId: undefined,
      user: undefined,
    });
  }

  private update = (user: User) => {
    this.setState({
      loading: true,
    });

    user = {
      id: this.state.userId,
      ...user
    }

    Users.update(user)
      .then(updated => {
        openSnackbar('Details updated');
        
        this.setState({
          loading: false,
          user: updated,
        })
      })
      .catch(error => {
        openSnackbar(error.message);

        this.setState({
          loading: false,
          error: error.message,
        })
      });
  }

  private changePassword = (payload: ChangePasswordPayload) => {
    this.setState({
      ...this.state,
      loading: true,
    });

    Auth.changePassword(payload)
      .then(() => {
        openSnackbar('Pasword updated');

        this.setState({
          ...this.state,
          loading: false,
        })
      })
      .catch(error => {
        openSnackbar(error.message);
        
        this.setState({
          ...this.state,
          loading: false,
          error: error.message,
        })
      });
  }
}