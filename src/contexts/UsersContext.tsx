import * as React from 'react';
import Users, { User } from '../servises/Users';
import { openSnackbar } from '../components/Notifier';

export const UsersContext = React.createContext<UsersState & UserContextActions>({
  loading: false,
  addDialogOpen: false,
  users: [],
  actions: {
    openAddDialog: () => {},
    closeAddDialog: () => {},
    add: () => {},
    delete: () => {},
    load: () => {}
  }
});

interface UserContextActions {
  actions: {
    openAddDialog: () => void,
    closeAddDialog: () => void,
    add: (user: User) => void,
    delete: (user: User) => void,
    load: () => void,
  }
}

interface UsersState {
  loading: boolean;
  addDialogOpen: boolean
  users: User[];
}

export default class UsersProvider extends React.Component<{}, UsersState> {
  public state = {
    loading: false,
    addDialogOpen: false,
    users: [],
  }

  public render() {
    const { children } = this.props;
    const value = {
      ...this.state,
      actions: {
        openAddDialog: this.openAddDialog,
        closeAddDialog: this.closeAddDialog,
        add: this.add,
        delete: this.delete,
        load: this.load,
      }
    }

    return (
      <UsersContext.Provider value={value}>
        {children}
      </UsersContext.Provider>
    );
  }

  private load = () => {
    this.setState({ loading: true });

    Users.all()
      .then((users) => this.setState({
        loading: false,
        users
      }))
      .catch((error) => {
        openSnackbar(error.message);

        this.setState({
          loading: false,
        })
      });
  }

  private openAddDialog = () => this.setState({ addDialogOpen: true });

  private closeAddDialog = () => this.setState({ addDialogOpen: false });

  private add = (user: User) => {
    this.setState({
      loading: true,
    })

    Users.create(user).then(newUser => {
      openSnackbar('User created');

      this.setState({
        loading: false,
        addDialogOpen: false,
        users: [
          ...this.state.users,
          newUser,
        ]
      })
    }).catch(error => {
      openSnackbar(error.message);

      this.setState({
        loading: false,
      });
    });
  }
  
  private delete = (user: User) => {
    this.setState({
      loading: true,
    });

    Users.delete(user).then(() => {
      openSnackbar('User deleted');

      this.setState((prev) => ({
        loading: false,
        users: prev.users.filter(item => item.id !== user.id),
      }))
    }).catch(error => {
      openSnackbar(error.message);

      this.setState({
        loading: false,
      });
    });
  }
}