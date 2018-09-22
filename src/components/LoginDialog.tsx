import * as React from 'react';
import {
  withStyles, StyleRulesCallback,
  Theme, WithStyles
} from '@material-ui/core/styles';
import { TransitionProps } from '@material-ui/core/transitions/transition';
// import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import { AuthContext } from '../contexts/AuthContext';
import LoginForm from './LoginForm';

interface LoginDialogProps {
  open: boolean;
  error: string;
  onClose: () => void;
  onLogin: () => void;
}

type ComponentClassNames =
  | 'appBar'
  | 'flex';

export const styles: StyleRulesCallback = (theme: Theme) => ({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
});

function Transition(props: TransitionProps) {
  return <Slide direction="up" {...props} />;
}

class LoginDialog extends React.Component<LoginDialogProps & WithStyles<ComponentClassNames>> {
  public render() {
    const { open, classes, error, onClose, onLogin } = this.props;

    return (
      <Dialog
        fullScreen
        open={open}
        onClose={onClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color="inherit" onClick={onClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Login
            </Typography>
          </Toolbar>
        </AppBar>

        <LoginForm error={error} onSubmit={onLogin} />

      </Dialog>
    );
  }
}

const StyledLoginDialog = withStyles(styles)(LoginDialog);

export default (props: any) => (
  <AuthContext.Consumer>
    {(auth) => (
      <StyledLoginDialog
        {...props}
        error={auth.error}
        open={auth.loginBoxOpen}
        onClose={auth.actions.closeLoginBox}
        onLogin={auth.actions.login}
      />
    )}
  </AuthContext.Consumer>
);