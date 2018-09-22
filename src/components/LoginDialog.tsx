import * as React from 'react';
import {
  withStyles, StyleRulesCallback,
  Theme, WithStyles
} from '@material-ui/core/styles';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import { AuthContext } from '../contexts/AuthContext';

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
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
    const { open, classes, onClose } = this.props;

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
              Sound
            </Typography>
            <Button color="inherit" onClick={onClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Default notification ringtone" secondary="Tethys" />
          </ListItem>
        </List>
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
        open={auth.loginBoxOpen}
        onClose={auth.actions.closeLoginBox}
      />
    )}
  </AuthContext.Consumer>
);