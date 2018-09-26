import * as React from 'react';
import {
  StyleRulesCallback, Theme,
  withStyles, WithStyles
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { AuthContext } from '../contexts/AuthContext';
import { User } from '../servises/Users';

type ComponentClassNames =
  | 'root'
  | 'margin';

interface MyDetailsProps {
  user: User;
}

export const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    padding: theme.spacing.unit * 3,
    width: '50%',
  },
  margin: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  }
});

class MyDetails extends React.Component<MyDetailsProps & WithStyles<ComponentClassNames>> {
  public state = {
    firstName: '',
    lastName: '',
    email: ''
  }

  public componentWillMount() {
    this.setState(this.props.user);
  }

  public render() {
    const { classes, } = this.props;
    const { firstName, lastName, email } = this.state;

    return (
      <div className={classes.root}>
        <TextField fullWidth className={classes.margin} label="First Name" value={firstName} />
        <TextField fullWidth className={classes.margin} label="Last Name" value={lastName} />
        <TextField fullWidth className={classes.margin} label="Email" value={email} />
        <Button className={classes.margin} variant="raised" color="primary">Update</Button>
      </div>
    );
  }
}

const StyledMyDetails = withStyles(styles)(MyDetails);

export default (props: any) => (
  <AuthContext.Consumer>
    {(auth) => (
      <StyledMyDetails
        {...props}
        user={auth.user}
      />
    )}
  </AuthContext.Consumer>
);