import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { UsersContext } from '../contexts/UsersContext';

interface AddUserDialogProps {
  open: boolean;
  onClose: () => void;
}

class AddUserDialog extends React.Component<AddUserDialogProps> {
  public render() {
    const { open, onClose } = this.props;
    return (
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add User</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="firstName"
            label="First Name"
            fullWidth />
          <TextField
            margin="dense"
            id="lastName"
            label="Last Name"
            fullWidth />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth />
          <TextField
            type="password"
            margin="dense"
            id="password"
            label="Password"
            fullWidth />
          <TextField
            type="password"
            margin="dense"
            id="confirmPassword"
            label="Repeat password"
            fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
            </Button>
          <Button onClick={onClose} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default (props: any) => (
  <UsersContext.Consumer>
    {(state) => (
      <AddUserDialog
        {...props}
        open={state.addDialogOpen}
        onClose={state.actions.closeAddDialog}
      />
    )}
  </UsersContext.Consumer>
);