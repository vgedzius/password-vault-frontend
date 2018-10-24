import * as React from 'react';
import { withStyles, StyleRulesCallback, Theme, WithStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { withRouter, RouteComponentProps } from 'react-router';

import { PasswordsContext } from '../contexts/PasswordsContext';

interface SearchBoxProps extends RouteComponentProps {
  onSearch: (term: string) => void;
}

type ComponentClassNames =
  | 'search'
  | 'searchIcon'
  | 'inputRoot'
  | 'inputInput'

export const styles: StyleRulesCallback = (theme: Theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
})

class SearchBox extends React.Component<SearchBoxProps & WithStyles<ComponentClassNames>> {
  public state = {
    value: '',
  }
  public render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          value={value}
          onChange={this.handleChange}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
        />
      </div>
    );
  }

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { history, onSearch } = this.props;
    const value = event.currentTarget.value;

    this.setState({ value });

    if (history.location.pathname !== '/') {
      history.push('/');
    }

    onSearch(value);
  };
}

const EnhancedSearchBox = withRouter(withStyles(styles)(SearchBox));

export default (props: any) => (
  <PasswordsContext.Consumer>
    {(passwords) => (
      <EnhancedSearchBox
        {...props}
        onSearch={passwords.actions.search}
      />
    )}
  </PasswordsContext.Consumer>
);