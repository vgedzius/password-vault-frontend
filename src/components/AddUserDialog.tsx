import * as React from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import { UsersContext } from '../contexts/UsersContext';
import { openSnackbar } from './Notifier';
import { User } from '../servises/Users';
import { Grid } from '@material-ui/core';

interface AddUserDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (user: User) => void;
}

class AddUserDialog extends React.Component<AddUserDialogProps> {
  public state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  }

  public componentDidMount() {
    ValidatorForm.addValidationRule('isPasswordMatch', (value: string) => {
      if (value !== this.state.password) {
        return false;
      }
      return true;
    });
  }

  public render() {
    const { open, onClose } = this.props;
    const { firstName, lastName, email, password, confirmPassword } = this.state;

    return (
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="form-dialog-title">
        <ValidatorForm instantValidate onSubmit={this.handleSubmit} onError={this.handleError}>
          <DialogTitle id="form-dialog-title">Add User</DialogTitle>
          <DialogContent>
            <Grid container spacing={16}>
              <Grid item sm={6}>
                <TextValidator
                  fullWidth
                  margin="normal"
                  name="firstName"
                  id="firstName"
                  label="First Name"
                  value={firstName}
                  validators={['required']}
                  errorMessages={['This field is required']}
                  onChange={this.handleChange('firstName')} />
              </Grid>
              <Grid item sm={6}>
                <TextValidator
                  fullWidth
                  margin="normal"
                  name="lastName"
                  id="lastName"
                  label="Last Name"
                  value={lastName}
                  validators={['required']}
                  errorMessages={['This field is required']}
                  onChange={this.handleChange('lastName')} />
              </Grid>
            </Grid>
            <Grid container spacing={16}>
              <Grid item sm={12}>
                <TextValidator
                  fullWidth
                  margin="dense"
                  name="email"
                  id="email"
                  label="Email"
                  type="text"
                  value={email}
                  validators={['required', 'isEmail']}
                  errorMessages={['This field is required', 'Email address is invalid']}
                  onChange={this.handleChange('email')} />
              </Grid>
            </Grid>
            <Grid container spacing={16}>
              <Grid item sm={6}>
                <TextValidator
                  fullWidth
                  type="password"
                  margin="dense"
                  name="password"
                  id="password"
                  label="Password"
                  value={password}
                  validators={['required']}
                  errorMessages={['This field is required']}
                  onChange={this.handleChange('password')} />
              </Grid>
              <Grid item sm={6}>
                <TextValidator
                  fullWidth
                  type="password"
                  margin="dense"
                  name="confirmPassword"
                  id="confirmPassword"
                  label="Repeat password"
                  validators={['required', 'isPasswordMatch']}
                  value={confirmPassword}
                  errorMessages={['This field is required', 'Passwords doesn\'t match']}
                  onChange={this.handleChange('confirmPassword')} />
              </Grid>
            </Grid>
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
    const { firstName, lastName, email, password } = this.state;

    this.props.onAdd({ firstName, lastName, email, password });
  }
}

export default (props: any) => (
  <UsersContext.Consumer>
    {(users) => (
      <AddUserDialog
        {...props}
        open={users.addDialogOpen}
        onClose={users.actions.closeAddDialog}
        onAdd={users.actions.add}
      />
    )}
  </UsersContext.Consumer>
);