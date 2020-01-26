import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

export class Notification extends Component {
  //this CMP will get the notification msg from props
  //will be rendered inside each component which can cause any notification

  state = {
    open: true,
    vertical: 'top',
    horizontal: 'center',
  };

  componentDidMount() {
    this.updateOpenState();
  }

  componentDidUpdate(prevProps) {
    //if the prevprops open property is defferent from the current state's open property, update it
  }

  updateOpenState() {
    debugger;
    this.setState({ ...this.state, open: this.props.open });
  }

  handleClick = newState => {
    this.setState({ open: true, ...newState });
  };

  handleClose = () => {
    this.setState({ ...this.state, open: false });
  };

  render() {
    const { vertical, horizontal, open } = this.state;

    return (
      <div>
        <Snackbar anchorOrigin={{ vertical, horizontal }} key={`${vertical},${horizontal}`} open={open} onClose={this.handleClose} message={this.props.msg} />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
