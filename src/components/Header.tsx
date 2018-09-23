import * as React from 'react';
import {
  withStyles, WithStyles,
  StyleRulesCallback, Theme
} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { AuthContext } from '../contexts/AuthContext';
import { User } from '../servises/Auth';
import { MAIN_MENU_WIDTH } from '../config';
import MainMenu from './MainMenu';

type ComponentClassNames =
  | 'root'
  | 'grow'
  | 'menuButton'
  | 'hide'
  | 'appBar'
  | 'appBarShift'

export interface HeaderProps {
  user?: User;
  loading: boolean;
  onLogout: () => void;
}

export const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: MAIN_MENU_WIDTH,
    width: `calc(100% - ${MAIN_MENU_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
});

class Header extends React.Component<HeaderProps & WithStyles<ComponentClassNames>> {
  public state = {
    anchorEl: null,
    mainMenuOpen: false,
  };

  public render() {
    const { classes, user } = this.props;
    const { anchorEl, mainMenuOpen } = this.state;
    const open = Boolean(anchorEl);
    const AccountLink = (props: any) => <Link to="/account" {...props} />

    return (
      <React.Fragment>
        <AppBar position="absolute" className={classNames(classes.appBar, mainMenuOpen && classes.appBarShift)}>
          <Toolbar>
            {user && (
              <IconButton className={classNames(classes.menuButton, mainMenuOpen && classes.hide)} color="inherit" aria-label="Menu" onClick={this.openMainMenu}>
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="title" color="inherit" className={classes.grow}>Password Vault</Typography>
            {user && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                    onClick={this.openUserMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                    onClose={this.closeUserMenu}
                >
                    <MenuItem onClick={this.closeUserMenu} component={AccountLink}>Account</MenuItem>
                  <MenuItem onClick={this.logout}>Logout</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>

        {user && (
          <MainMenu open={mainMenuOpen} onClose={this.closeMainMenu} />
        )}
      </React.Fragment>
    );
  }

  private openUserMenu = (event: React.FormEvent) => this.setState({ anchorEl: event.currentTarget });

  private closeUserMenu = () => this.setState({ anchorEl: null });

  private openMainMenu = () => this.setState({ mainMenuOpen: true });

  private closeMainMenu = () => this.setState({ mainMenuOpen: false });

  private logout = () => {
    this.props.onLogout();
    this.setState({ anchorEl: null });
  }
}

const StyledHeader = withStyles(styles)(Header);

export default (props: any) => (
  <AuthContext.Consumer>
    {(auth) => (
      <StyledHeader
        {...props}
        loading={auth.loading}
        user={auth.user}
        onLogout={auth.actions.logout}
      />
    )}
  </AuthContext.Consumer>
);