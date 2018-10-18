import * as React from 'react';

import { openSnackbar } from '../components/Notifier';
import Passwords, { Password } from '../servises/Passwords';

export const PasswordsContext = React.createContext<PasswordsState & PasswordsContextActions>({
  loading: false,
  dialogOpen: false,
  passwords: [],
  actions: {
    openDialog: () => { },
    closeDialog: () => { },
    add: () => { },
    delete: () => { },
    load: () => { }
  }
});

interface PasswordsContextActions {
  actions: {
    openDialog: (password?: Password) => void,
    closeDialog: () => void,
    add: (password: Password) => void,
    delete: (password: Password) => void,
    load: () => void,
  }
}

interface PasswordsState {
  loading: boolean;
  dialogOpen: boolean;
  current?: Password;
  passwords: Password[];
}

export default class PasswordsProvider extends React.Component<{}, PasswordsState> {
  public state = {
    loading: false,
    dialogOpen: false,
    passwords: [],
  }

  public render() {
    const { children } = this.props;
    const value = {
      ...this.state,
      actions: {
        openDialog: this.openDialog,
        closeDialog: this.closeDialog,
        add: this.add,
        delete: this.delete,
        load: this.load,
      }
    }

    return (
      <PasswordsContext.Provider value={value}>
        {children}
      </PasswordsContext.Provider>
    );
  }

  private load = () => {
    this.setState({ loading: true });

    Passwords.all()
      .then((passwords) => this.setState({
        loading: false,
        passwords
      }))
      .catch((error) => {
        openSnackbar(error.message);

        this.setState({
          loading: false,
        })
      });
  }

  private openDialog = (password?: Password) => this.setState({
    dialogOpen: true,
    current: password,
  });

  private closeDialog = () => this.setState({ dialogOpen: false });

  private add = (password: Password) => {
    this.setState({
      loading: true,
    })

    Passwords.create(password).then(newPassword => {
      openSnackbar('Password created');

      this.setState({
        loading: false,
        dialogOpen: false,
        passwords: [
          ...this.state.passwords,
          newPassword,
        ]
      })
    }).catch(error => {
      openSnackbar(error.message);

      this.setState({
        loading: false,
      });
    });
  }

  private delete = (password: Password) => {
    this.setState({
      loading: true,
    });

    Passwords.delete(password).then(() => {
      openSnackbar('Password deleted');

      this.setState((prev) => ({
        loading: false,
        passwords: prev.passwords.filter(item => item.id !== password.id),
      }))
    }).catch(error => {
      openSnackbar(error.message);

      this.setState({
        loading: false,
      });
    });
  }
}