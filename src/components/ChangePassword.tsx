import * as React from 'react';
import {
  StyleRulesCallback, Theme,
  withStyles, WithStyles
} from '@material-ui/core/styles';

type ComponentClassNames = 'root';

export const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    padding: theme.spacing.unit * 3
  },
});

class ChangePassword extends React.Component<WithStyles<ComponentClassNames>> {
  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>Change Password</div>
    );
  }
}

export default withStyles(styles)(ChangePassword);