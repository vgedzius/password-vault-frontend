import * as React from 'react';
import { withStyles, StyleRulesCallback, Theme, WithStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import LockIcon from '@material-ui/icons/Lock';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import classNames from 'classnames';
import * as CryptoJs from 'crypto-js';

import { Password } from '../servises/Passwords';
import { confirm } from './ConfirmDialog';
import { PasswordsContext } from 'src/contexts/PasswordsContext';

export interface PasswordCardProps {
  password: Password;
  onDelete: (password: Password) => void;
  onEdit: (password: Password) => void;
}

type ComponentClassNames = 
  | 'root'
  | 'card'
  | 'details'
  | 'content'
  | 'cover'
  | 'controls'
  | 'hidden'

const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit * 2,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '33.333333%',
    },
    [theme.breakpoints.up('xl')]: {
      width: '25%',
    },
  },
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    overflow: 'hidden',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    minWidth: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  hidden: {
    visibility: 'hidden',
  }
});

class PasswordCard extends React.Component<PasswordCardProps & WithStyles<ComponentClassNames>> {
  public state = {
    hover: false,
  }

  public render() {
    const { classes, password } = this.props;
    const { hover } = this.state;
    const gravatar = `https://www.gravatar.com/avatar/${CryptoJs.MD5(password.url)}?d=robohash&s=300`;

    return (
      <div className={classes.root}>
        <Card
          raised={hover}
          className={classes.card}
          onMouseOver={this.handleMouseOver}
          onMouseLeave={this.handleMouseLeave}>

          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h2" variant="headline">{password.url}</Typography>
              <Typography variant="subheading" color="textSecondary">{password.userName}</Typography>
            </CardContent>
            <div className={classNames(classes.controls, !hover && classes.hidden)}>
              <IconButton aria-label="Edit" onClick={this.handleEditClick}>
                <Tooltip TransitionComponent={Zoom} title="Edit">
                  <EditIcon />
                </Tooltip>
              </IconButton>
              <IconButton aria-label="Delete" onClick={this.handleDeleteClick}>
                <Tooltip TransitionComponent={Zoom} title="Delete">
                  <DeleteIcon />
                </Tooltip>
              </IconButton>
              <IconButton aria-label="Copy to clipboard">
                <Tooltip TransitionComponent={Zoom} title="Copy to clipboard">
                  <LockIcon />
                </Tooltip>
              </IconButton>
            </div>
          </div>
          <CardMedia
            className={classes.cover}
            image={gravatar}
            title={password.url} />
        </Card>
      </div>
    );
  }

  private handleMouseOver = () => this.setState({ hover: true });

  private handleMouseLeave = () => this.setState({ hover: false });

  private handleDeleteClick = () => {
    confirm({ confirmation: 'Are you sure you want to delete this password?' })
      .then(() => this.props.onDelete(this.props.password));
  }

  private handleEditClick = () => {
    this.props.onEdit(this.props.password);
  }
}

const StyledPasswordCard = withStyles(styles)(PasswordCard)

export default (props: any) => (
  <PasswordsContext.Consumer>
    {(passwords) => (
      <StyledPasswordCard
        {...props}
        onEdit={passwords.actions.openDialog}
      />
    )}
  </PasswordsContext.Consumer>
);