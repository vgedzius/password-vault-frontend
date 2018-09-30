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
  }
});

interface UserContextActions {
  actions: {
    openAddDialog: () => void,
    closeAddDialog: () => void,
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

  public componentDidMount() {
    this.load();
  }

  public render() {
    const { children } = this.props;
    const value = {
      ...this.state,
      actions: {
        openAddDialog: this.openAddDialog,
        closeAddDialog: this.closeAddDialog,
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
      })
  }

  private openAddDialog = () => this.setState({ addDialogOpen: true });

  private closeAddDialog = () => this.setState({ addDialogOpen: false });
}