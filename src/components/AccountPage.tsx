import * as React from 'react';
import { StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AccountIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';

import MyDetails from './MyDetails';
import ChangePassword from './ChangePassword';

type ComponentClassNames =
  | 'toolbar'

export const styles: StyleRulesCallback = (theme: Theme) => ({
  toolbar: {
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
  }
})

class AccountPage extends React.Component<WithStyles<ComponentClassNames>> {
  public state = {
    currentTab: 0,
  }

  public render() {
    const { currentTab } = this.state;
    const { classes } = this.props;

    return (
      <React.Fragment>
        <AppBar className={classes.toolbar} position="static" color="default">
          <Tabs value={currentTab} onChange={this.changeTab} indicatorColor="primary" textColor="primary">
            <Tab label="Personal Details" icon={<AccountIcon />} />
            <Tab label="Change Password" icon={<LockIcon />}  />
          </Tabs>
        </AppBar>

        <React.Fragment>
          {currentTab === 0 && <MyDetails />}
          {currentTab === 1 && <ChangePassword />}
        </React.Fragment>
      </React.Fragment>
    )
  }

  private changeTab = (e: React.ChangeEvent, v: number) => this.setState({currentTab: v})
}

export default withStyles(styles)(AccountPage);