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

export interface UsersProps {
  loading: boolean;
  users: User[];
}

export type ComponentClassNames = 
  | 'root'
  | 'addButton' 

export const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    padding: theme.spacing.unit * 3,
  },
  addButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: theme.spacing.unit * 3,
  }
})

class UsersPage extends React.Component<UsersProps & WithStyles<ComponentClassNames>> {
  public render() {
    const { loading, users, classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant="headline">Users</Typography>
        <Divider />
        {loading && (
          <LinearProgress />
        )}
        {users && (
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
                <UserRow user={user} />
              ))}
            </TableBody>
          </Table>
        )}
        <Button className={classes.addButton} variant="fab" color="secondary">
          <PersonAddIcon />
        </Button>
      </div>
    )
  }
}

const StyledUserPage = withStyles(styles)(UsersPage);

export default (props: any) => (
  <UsersContext.Consumer>
    {(data) => (
      <StyledUserPage
        {...props}
        users={data.users}
      />
    )}
  </UsersContext.Consumer>
);