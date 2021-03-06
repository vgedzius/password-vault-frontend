import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import { PasswordsContext } from '../contexts/PasswordsContext';
import { Password } from '../servises/Passwords';
import PasswordCard from './PasswordCard';
import PageHeader from './PageHeader';
import PasswordDialog from './PasswordDialog';

export interface PasswordsPageProps {
  loading: boolean;
  passwords: Password[];
  onAdd: () => void;
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
    position: 'fixed',
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
    marginLeft: -theme.spacing.unit,
    marginRight: -theme.spacing.unit,
  }
})

class PasswordsPage extends React.Component<PasswordsPageProps & WithStyles<ComponentClassNames>> {
  public componentDidMount() {
    this.props.onLoad();
  }

  public render() {
    const { classes, loading, passwords } = this.props;
    return (
      <div className={classes.root}>
        <PageHeader headline="Passwords" loading={loading} />
        {passwords &&
          <div className={classes.grid}>
            {passwords.map(password =>
              <PasswordCard key={password.id} password={password} onDelete={this.handleDelete} />
            )}
          </div>
        }
        <Button className={classes.addButton} variant="fab" color="secondary" onClick={this.handleAddClick}>
          <AddIcon />
        </Button>
        <PasswordDialog />
      </div>
    )
  }

  private handleDelete = (password: Password) => this.props.onDelete(password);

  private handleAddClick = () => {
    this.props.onAdd();
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
        onAdd={passwords.actions.openDialog}
        onDelete={passwords.actions.delete}
        onLoad={passwords.actions.load}
      />
    )}
  </PasswordsContext.Consumer>
);