import * as React from 'react';
import { withStyles, WithStyles, StyleRulesCallback, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Lock from '@material-ui/icons/Lock';

import { Credentials } from '../servises/Auth';

import topSecret from '../topsecret.png';
import { Typography } from '@material-ui/core';

export interface LoginFormState {
  password: string;
  username: string;
  persist: boolean;
}

export interface LoginFormProps {
  error: string;
  onSubmit: (credentials: Credentials) => void;
}

export type ComponentClassNames =
  | 'loginButton'
  | 'form'
  | 'grow'
  | 'logo'
  | 'error';

export const styles: StyleRulesCallback = (theme: Theme) => ({
  loginButton: {
    width: '100%',
  },
  form: {
    margin: '0 auto',
    padding: theme.spacing.unit,
    minWidth: 250,
    maxWidth: 350,
  },
  grow: {
    flexGrow: 1,
  },
  logo: {
    maxWidth: '100%',
  },
  error: {
    textAlign: 'center',
  }
})

class LoginForm extends React.Component<LoginFormProps & WithStyles<ComponentClassNames>, LoginFormState> {
  public componentWillMount() {
    this.setState({
      password: '',
      username: '',
      persist: true,
    });
  }

  public render() {
    const { classes, error } = this.props;
    const { username, password, persist } = this.state;

    return (
      <form onSubmit={this.submit} className={classes.form}>
        <img src={topSecret} className={classes.logo} />
        {error && (
          <Typography color="error" className={classes.error}>{error}</Typography>
        )}
        <Grid container spacing={8} alignItems="flex-end" alignContent="space-between">
          <Grid item>
            <AccountCircle />
          </Grid>
          <Grid item className={classes.grow}>
            <TextField margin="dense" id="email" label="Email Address" type="text" error={Boolean(error)} fullWidth value={username} onChange={this.handleChange('username')} />
          </Grid>
        </Grid>

        <Grid container spacing={8} alignItems="flex-end">
          <Grid item>
            <Lock />
          </Grid>
          <Grid item className={classes.grow}>
            <TextField margin="dense" id="password" label="Password" type="password" error={Boolean(error)} fullWidth value={password} onChange={this.handleChange('password')} />
          </Grid>
        </Grid>

        <FormGroup row>
          <FormControlLabel label="Remember me"
            control={
              <Checkbox onChange={this.togglePersist} checked={persist} />
            }
          />
        </FormGroup>

        <Button type="submit" color="secondary" variant="raised" className={classes.loginButton}>Login</Button>
      </form>
    );
  }

  private handleChange = (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      [prop]: event.currentTarget.value
    });
  }

  private togglePersist = () => {
    this.setState({
      ...this.state,
      persist: !this.state.persist,
    });
  }

  private submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
  }
}

export default withStyles(styles)(LoginForm);