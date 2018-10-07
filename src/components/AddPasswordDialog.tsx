import * as React from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import { openSnackbar } from './Notifier';
import { Password } from '../servises/Passwords';
import { PasswordsContext } from '../contexts/PasswordsContext';

interface AddPasswordDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (password: Password) => void;
}

class AddPasswordDialog extends React.Component<AddPasswordDialogProps> {
  public state = {
    url: '',
    userName: '',
    password: '',
  }

  public render() {
    const { onClose, open } = this.props;
    const { url, userName, password } = this.state;

    return (
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="form-dialog-title">
        <ValidatorForm instantValidate onSubmit={this.handleSubmit} onError={this.handleError}>
          <DialogTitle id="form-dialog-title">Add User</DialogTitle>
          <DialogContent>
            <TextValidator
              fullWidth
              margin="normal"
              name="url"
              id="url"
              label="URL"
              value={url}
              validators={['required']}
              errorMessages={['This field is required']}
              onChange={this.handleChange('url')} />
            <TextValidator
              fullWidth
              margin="normal"
              name="userName"
              id="userName"
              label="Username"
              value={userName}
              validators={['required']}
              errorMessages={['This field is required']}
              onChange={this.handleChange('userName')} />
            <TextValidator
              fullWidth
              margin="normal"
              name="password"
              id="password"
              label="Password"
              type="text"
              value={password}
              validators={['required']}
              errorMessages={['This field is required']}
              onChange={this.handleChange('password')} />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} variant="outlined" color="default">
              Cancel
              </Button>
            <Button type="submit" variant="contained" color="primary">
              Add
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    );
  }

  private handleError = () => {
    openSnackbar('Please check your inputs');
  }

  private handleChange = (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      [prop]: event.currentTarget.value
    });
  }

  private handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { url, userName, password } = this.state;

    this.props.onAdd({ url, userName, password });
  }
}

export default (props: any) => (
  <PasswordsContext.Consumer>
    {(passwords) => (
      <AddPasswordDialog
        {...props}
        open={passwords.addDialogOpen}
        onClose={passwords.actions.closeAddDialog}
        onAdd={passwords.actions.add}
      />
    )}
  </PasswordsContext.Consumer>
);