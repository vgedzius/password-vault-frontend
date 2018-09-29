import * as React from 'react';
import {
  StyleRulesCallback, Theme,
  withStyles, WithStyles
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { AuthContext } from '../contexts/AuthContext';
import { User } from '../servises/Users';

type ComponentClassNames =
  | 'root'
  | 'margin';

interface MyDetailsProps {
  user: User;
  loading: boolean;
  onSave: (data: MyDetailsState) => void;
}

interface MyDetailsState {
  firstName: string;
  lastName: string;
  email: string;
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

class MyDetails extends React.Component<MyDetailsProps & WithStyles<ComponentClassNames>, MyDetailsState> {
  public state = {
    firstName: '',
    lastName: '',
    email: ''
  }

  public componentWillMount() {
    this.setState(this.props.user);
  }

  public render() {
    const { classes, loading } = this.props;
    const { firstName, lastName, email } = this.state;

    return (
      <form className={classes.root} onSubmit={this.handleSubmit}>
        <TextField fullWidth className={classes.margin} label="First Name" value={firstName} onChange={this.handleChange('firstName')} />
        <TextField fullWidth className={classes.margin} label="Last Name" value={lastName} onChange={this.handleChange('lastName')} />
        <TextField fullWidth className={classes.margin} label="Email" value={email} onChange={this.handleChange('email')} />
        <Button disabled={loading} type="submit" className={classes.margin} variant="raised" color="primary">
          {loading ? <CircularProgress size={16} color='inherit' /> : 'Update'}
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
    this.props.onSave(this.state);
  }
}

const StyledMyDetails = withStyles(styles)(MyDetails);

export default (props: any) => (
  <AuthContext.Consumer>
    {(auth) => (
      <StyledMyDetails
        {...props}
        loading={auth.loading}
        user={auth.user}
        onSave={auth.actions.update}
      />
    )}
  </AuthContext.Consumer>
);