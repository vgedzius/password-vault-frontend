import * as React from 'react';
import {
  StyleRulesCallback, Theme,
  withStyles, WithStyles
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import { AuthContext } from '../contexts/AuthContext';
import { openSnackbar } from './Notifier';

type ComponentClassNames =
  | 'root'
  | 'margin'

interface ChangePasswordProps {
  loading: boolean;
  onSave: (data: ChangePasswordData) => void;
}

interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
}

export const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    padding: theme.spacing.unit * 3,
    maxWidth: 500,
  },
  margin: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  }
});

class ChangePassword extends React.Component<ChangePasswordProps & WithStyles<ComponentClassNames>> {
  public state = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  }

  public componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule('isPasswordMatch', (value: string) => {
      if (value !== this.state.newPassword) {
        return false;
      }
      return true;
    });
  }

  public render() {
    const { classes, loading } = this.props;
    const { oldPassword, newPassword, confirmPassword } = this.state;

    return (
      <div className={classes.root}>
        <ValidatorForm onSubmit={this.handleSubmit} onError={this.handleError}>
          <TextValidator
            fullWidth
            type="password"
            className={classes.margin}
            value={oldPassword}
            name="oldPassword"
            label="Old Password"
            onChange={this.handleChange('oldPassword')}
            validators={['required']}
            errorMessages={['This field is required']} />
          <TextValidator
            fullWidth
            type="password"
            className={classes.margin}
            value={newPassword}
            name="newPassword"
            label="New Password"
            onChange={this.handleChange('newPassword')}
            validators={['required']}
            errorMessages={['This field is required']} />
          <TextValidator
            fullWidth
            type="password"
            className={classes.margin}
            value={confirmPassword}
            name="confirmPassword"
            label="Confirm"
            onChange={this.handleChange('confirmPassword')}
            validators={['required', 'isPasswordMatch']}
            errorMessages={['This field is required', 'Passwords doesn\'t match']} />
          <Button className={classes.margin} type="submit" variant="raised" color="primary">
            {loading ? <CircularProgress size={16} color='inherit' /> : 'Change'}
          </Button>
        </ValidatorForm>
      </div>
    );
  }

  private handleChange = (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      [prop]: event.currentTarget.value
    });
  }

  private handleError = () => {
    openSnackbar('Please check your inputs');
  }

  private handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { oldPassword, newPassword } = this.state;
    this.props.onSave({ oldPassword, newPassword });
  }
}

const StyledChangePassword = withStyles(styles)(ChangePassword);

export default () => (
  <AuthContext.Consumer>
    {(auth) => (
      <StyledChangePassword
        loading={auth.loading}
        onSave={auth.actions.changePassword}
      />
    )}
  </AuthContext.Consumer>
);