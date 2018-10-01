import * as React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';

import { User } from '../servises/Users';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';

export interface UserRowProps {
  user: User;
}

export default class UserRow extends React.Component<UserRowProps> {
  public render() {
    const { user } = this.props;

    return (
      <TableRow hover onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
        <TableCell>{user.firstName} {user.lastName}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>
          <IconButton color="secondary">
            <DeleteIcon fontSize="small" />
          </IconButton >
        </TableCell>
      </TableRow>
    )
  }

  private handleMouseOver = () => this.setState({ hover: true })

  private handleMouseLeave = () => this.setState({ hover: false })
  
}