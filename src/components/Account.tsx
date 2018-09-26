import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AccountIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';

import MyDetails from './MyDetails';
import ChangePassword from './ChangePassword';

export default class Account extends React.Component {
  public state = {
    currentTab: 0,
  }

  public render() {
    const { currentTab } = this.state;

    return (
      <React.Fragment>
        <AppBar position="static" color="default">
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