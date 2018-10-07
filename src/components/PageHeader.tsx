import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Divider from '@material-ui/core/Divider';

interface PageHeaderProps {
  loading: boolean;
  headline: string;
}

export type ComponentClassNames =
  | 'progress'

export const styles: StyleRulesCallback = (theme: Theme) => ({
  progress: {
    height: 1,
  },
})

class PageHeader extends React.Component<PageHeaderProps & WithStyles<ComponentClassNames>> {
  public render() {
    const { loading, classes } = this.props;

    return (
      <React.Fragment>
        <Typography variant="headline">Passwords</Typography>
        {loading ? <LinearProgress className={classes.progress} /> : <Divider />}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(PageHeader)