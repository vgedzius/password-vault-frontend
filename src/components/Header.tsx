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
import Home from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthContext';
import { User } from '../servises/Auth';

type ComponentClassNames =
  | 'root'
  | 'grow'
  | 'menuButton';

export interface HeaderProps {
  user?: User;
  loading: boolean;
  logout: () => void;
  showLogin: () => void;
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
});

class Header extends React.Component<HeaderProps & WithStyles<ComponentClassNames>> {
  public state = {
    anchorEl: null,
  };

  public render() {
    const { classes, user, showLogin } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const AccountLink = (props: any) => <Link to="/account" {...props} />
    const HomeLink = (props: any) => <Link to="/" {...props} />

    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" component={HomeLink}>
            <Home />
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.grow}>Password Vault</Typography>
          {user ? (
            <div>
              <IconButton
                aria-owns={open ? 'menu-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.openMenu}
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
                onClose={this.closeMenu}
              >
                <MenuItem onClick={this.closeMenu} component={AccountLink}>Account</MenuItem>
                <MenuItem onClick={this.closeMenu}>Logout</MenuItem>
              </Menu>
            </div>
          ) : <Button color="inherit" onClick={showLogin}>Login</Button>}
        </Toolbar>
      </AppBar>
    );
  }

  private openMenu = (event: React.FormEvent) => {
    this.setState({ anchorEl: event.currentTarget });
  }

  private closeMenu = () => {
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
        logout={auth.actions.logout}
        showLogin={auth.actions.openLoginBox}
      />
    )}
  </AuthContext.Consumer>
);