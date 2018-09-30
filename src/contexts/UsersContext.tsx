import * as React from 'react';
import Users, { User } from '../servises/Users';
import { openSnackbar } from '../components/Notifier';

export const UsersContext = React.createContext<UsersState>({
  loading: false,
  users: [],
});

interface UsersState {
  loading: boolean;
  users: User[];
}

export default class UsersProvider extends React.Component<{}, UsersState> {
  public state = {
    loading: false,
    users: [],
  }

  public componentDidMount() {
    this.load();
  }

  public render() {
    const { children } = this.props;

    return (
      <UsersContext.Provider value={this.state}>
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
}