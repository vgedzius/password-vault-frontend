import * as React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

let openSnackbarFn: (message: string) => void;

class Notifier extends React.Component {
  public state = {
    open: false,
    message: '',
  };

  public componentDidMount() {
    openSnackbarFn = this.openSnackbar;
  }

  public openSnackbar = (message: string) => {
    this.setState({
      open: true,
      message,
    });
  };
  
  public render() {
    const { message, open } = this.state;

    return (
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        message={<span id="snackbar-message-id" >{message}</span>}
        autoHideDuration={3000}
        onClose={this.handleSnackbarClose}
        open={open}
        ContentProps={{
          'aria-describedby': 'snackbar-message-id',
        }}
      />
    );
  }

  private handleSnackbarClose = () => {
    this.setState({
      open: false,
      message: '',
    });
  };

}

export function openSnackbar(message: string) {
  openSnackbarFn(message);
}

export default Notifier;