import * as React from 'react';
import {
  StyleRulesCallback, Theme,
  withStyles, WithStyles
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { AuthContext } from '../contexts/AuthContext';

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

  public render() {
    const { classes, loading } = this.props;
    const { oldPassword, newPassword, confirmPassword } = this.state;

    return (
      <form className={classes.root} onSubmit={this.handleSubmit}>
        <TextField fullWidth type="password" className={classes.margin} value={oldPassword} label="Old Password" onChange={this.handleChange('oldPassword')} />
        <TextField fullWidth type="password" className={classes.margin} value={newPassword} label="New Password" onChange={this.handleChange('newPassword')} />
        <TextField fullWidth type="password" className={classes.margin} value={confirmPassword} label="Confirm" onChange={this.handleChange('confirmPassword')} />
        <Button className={classes.margin} type="submit" variant="raised" color="primary">
          {loading ? <CircularProgress size={16} color='inherit' /> : 'Change'}
        </Button>
      </form>
    );
  }

  private handleChange = (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      [prop]: event.currentTarget.value
    });
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