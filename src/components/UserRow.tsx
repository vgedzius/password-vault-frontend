import * as React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';

import { User } from '../servises/Users';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';

export interface UserRowProps {
  user: User;
}

export default class UserRow extends React.Component<UserRowProps> {
  public state = {
    hover: false,
  }

  public render() {
    const { user } = this.props;
    const { hover } = this.state;

    return (
      <TableRow hover onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
        <TableCell>{user.firstName} {user.lastName}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>
          {hover && (
            <Button mini variant="fab" color="secondary">
              <DeleteIcon />
            </Button>
          )}
        </TableCell>
      </TableRow>
    )
  }

  private handleMouseOver = () => this.setState({ hover: true })

  private handleMouseLeave = () => this.setState({ hover: false })
  
}