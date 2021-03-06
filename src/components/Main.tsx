import * as React from 'react';
import { StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core/styles';

import Header from './Header';
import Content from './Content';
import Notifier from './Notifier';

type ComponentClassNames =
  | 'root'
  | 'content'

export const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    flexGrow: 1,
    minHeight: window.innerHeight,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
});

class Main extends React.Component<WithStyles<ComponentClassNames>> {
  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Header />
        <Content />
        <Notifier />
      </div>
    );
  }
}

export default withStyles(styles)(Main);