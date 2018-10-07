import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { PasswordsContext } from '../contexts/PasswordsContext';
import { LinearProgress, Divider } from '@material-ui/core';
import { Password } from '../servises/Passwords';
import PasswordCard from './PasswordCard';

export interface PasswordsPageProps {
  loading: boolean;
  passwords: Password[];
  onAddClick: () => void;
  onLoad: () => void;
  onDelete: (password: Password) => void;
}

export type ComponentClassNames =
  | 'root'
  | 'addButton'
  | 'progress'
  | 'grid'

export const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    padding: theme.spacing.unit * 3,
  },
  addButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: theme.spacing.unit * 3,
  },
  progress: {
    height: 1,
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: theme.spacing.unit * 3,
  }
})

class PasswordsPage extends React.Component<PasswordsPageProps & WithStyles<ComponentClassNames>> {
  public componentDidMount() {
    this.props.onLoad();
  }

  public render() {
    const { classes, loading, passwords } = this.props;
    console.log(passwords);
    return (
      <div className={classes.root}>
        <Typography variant="headline">Passwords</Typography>
        {loading ? <LinearProgress className={classes.progress} /> : <Divider />}
        {passwords &&
          <div className={classes.grid}>
            {passwords.map(password =>
              <PasswordCard key={password.id} password={password} />
            )}
          </div>
        }
      </div>
    )
  }
}

const StyledPasswordsPage = withStyles(styles)(PasswordsPage)

export default (props: any) => (
  <PasswordsContext.Consumer>
    {(passwords) => (
      <StyledPasswordsPage
        {...props}
        loading={passwords.loading}
        passwords={passwords.passwords}
        onAddClick={passwords.actions.openAddDialog}
        onDelete={passwords.actions.delete}
        onLoad={passwords.actions.load}
      />
    )}
  </PasswordsContext.Consumer>
);