import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Divider from '@material-ui/core/Divider';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';

import { UsersContext } from '../contexts/UsersContext';
import { User } from '../servises/Users';
import UserRow from './UserRow';
import AddUserDialog from './AddUserDialog';

export interface UsersProps {
  loading: boolean;
  users: User[];
  onAddClick: () => void;
  onLoad: () => void;
}

export type ComponentClassNames = 
  | 'root'
  | 'addButton'
  | 'progress'

export const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    padding: theme.spacing.unit * 3,
  },
  addButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: theme.spacing.unit * 3,
  },
  progress: {
    height: 1,
  }
})

class UsersPage extends React.Component<UsersProps & WithStyles<ComponentClassNames>> {
  public componentDidMount() {
    this.props.onLoad();
  }

  public render() {
    const { loading, users, classes, onAddClick } = this.props;
    
    return (
      <div className={classes.root}>
        <Typography variant="headline">Users</Typography>
        {loading ? <LinearProgress className={classes.progress} /> : <Divider />}
        {users &&
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <UserRow key={user.id} user={user} />
              ))}
            </TableBody>
          </Table>
        }
        <Button className={classes.addButton} variant="fab" color="secondary" onClick={onAddClick}>
          <PersonAddIcon />
        </Button>
        <AddUserDialog />
      </div>
    )
  }
}

const StyledUserPage = withStyles(styles)(UsersPage);

export default (props: any) => (
  <UsersContext.Consumer>
    {(state) => (
      <StyledUserPage
        {...props}
        loading={state.loading}
        users={state.users}
        onAddClick={state.actions.openAddDialog}
        onLoad={state.actions.load}
      />
    )}
  </UsersContext.Consumer>
);