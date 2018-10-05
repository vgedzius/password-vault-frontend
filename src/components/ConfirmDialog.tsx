import * as React from 'react';
import { confirmable, ReactConfirmProps, createConfirmation } from 'react-confirm';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

class ConfirmDialog extends React.Component<ReactConfirmProps> {
  public render() {
    const { confirmation, show } = this.props;
    
    return (
      <Dialog
        open={show}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Confirmation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {confirmation}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="primary">Cancel</Button>
          <Button onClick={this.handleOK} color="primary" autoFocus>OK</Button>
        </DialogActions>
      </Dialog>
    );
  }

  private handleCancel = () => this.props.dismiss();

  private handleOK = () => this.props.proceed();
}

const confirmableDialog = confirmable(ConfirmDialog);

export const confirm = createConfirmation(confirmableDialog);

export default confirmableDialog;


