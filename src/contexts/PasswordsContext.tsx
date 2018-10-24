import * as React from 'react';

import { openSnackbar } from '../components/Notifier';
import Passwords, { Password } from '../servises/Passwords';

interface PasswordsContextActions {
  actions: {
    openDialog: (password?: Password) => void,
    closeDialog: () => void,
    add: (password: Password) => void,
    delete: (password: Password) => void,
    update: (password: Password) => void,
    load: () => void,
    search: (term: string) => void,
  }
}

interface PasswordsState {
  loading: boolean;
  dialogOpen: boolean;
  current?: Password;
  passwords: Password[];
}

export const PasswordsContext = React.createContext<PasswordsState & PasswordsContextActions>({
  loading: false,
  dialogOpen: false,
  passwords: [],
  actions: {
    openDialog: () => { },
    closeDialog: () => { },
    add: () => { },
    delete: () => { },
    update: () => { },
    load: () => { },
    search: () => { },
  }
});

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
        update: this.update,
        load: this.load,
        search: this.search,
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

  private openDialog = (password?: Password) => {
    this.setState({
      dialogOpen: true,
      current: password,
    });
  };

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

  private update = (password: Password) => {
    this.setState({
      loading: true,
    });

    Passwords.update(password).then((updatedPass) => {
      openSnackbar('Password updated');

      this.setState((prev) => {
        const { passwords } = prev;
        const current = passwords.find(item => item.id === updatedPass.id);

        if (current) {
          passwords[passwords.indexOf(current)] = updatedPass;
        }

        return {
          loading: false,
          dialogOpen: false,
          passwords,
        }
      })
    }).catch(error => {
      openSnackbar(error.message);

      this.setState({
        loading: false,
      });
    });
  }

  private search = (term: string) => {
    this.setState({ loading: true });

    Passwords.search(term)
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
}