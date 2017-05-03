import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';

import TextField from 'material-ui/TextField';

/**
 * Dialogs can be nested. This example opens a Date Picker from within a Dialog.
 */
export default class DialogAddProperty extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div>
        <RaisedButton label="Dialog With Date Picker" onTouchTap={this.handleOpen} />
        <Dialog
          title="Dialog With Date Picker"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
        <form>
        <TextField
          hintText="Name"
        /><br />
        <br />
        <TextField
          hintText="Location"
        /><br />
        <TextField
          hintText="Price"
        /><br />
        <TextField
          hintText="Want"
        /><br />
        </form>
        </Dialog>
      </div>
    );
  }
}
