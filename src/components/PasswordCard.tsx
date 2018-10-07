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


import { Password } from '../servises/Passwords';

export interface PasswordCardProps {
  password: Password;
}

type ComponentClassNames = 
  | 'root'
  | 'card'
  | 'details'
  | 'content'
  | 'cover'
  | 'controls'

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
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
});

class PasswordCard extends React.Component<PasswordCardProps & WithStyles<ComponentClassNames>> {
  public render() {
    const { classes, password } = this.props;

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h2" variant="headline">{password.url}</Typography>
              <Typography variant="subheading" color="textSecondary">{password.userName}</Typography>
            </CardContent>
            <div className={classes.controls}>
              <IconButton aria-label="Edit">
                <EditIcon />
              </IconButton>
              <IconButton aria-label="Delete">
                <DeleteIcon />
              </IconButton>
              <IconButton aria-label="Coppy to clipboard">
                <LockIcon />
              </IconButton>
            </div>
          </div>
          <CardMedia
            className={classes.cover}
            image="http://placecage.com/c/250/250"
            title="Live from space album cover" />
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(PasswordCard)