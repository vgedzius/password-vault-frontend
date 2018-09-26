import * as React from 'react';
import {
  StyleRulesCallback, Theme,
  withStyles, WithStyles
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

type ComponentClassNames =
  | 'root'
  | 'margin'

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

class ChangePassword extends React.Component<WithStyles<ComponentClassNames>> {
  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <TextField fullWidth className={classes.margin} label="Current Password" />
        <TextField fullWidth className={classes.margin} label="New Password" />
        <TextField fullWidth className={classes.margin} label="Confirm" />
        <Button className={classes.margin} variant="raised" color="primary">Change</Button>
      </div>
    );
  }
}

export default withStyles(styles)(ChangePassword);