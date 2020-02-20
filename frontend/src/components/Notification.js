import React, { Component } from 'react';
import { connect } from 'react-redux';

import Snackbar from '@material-ui/core/Snackbar';
import { SnackbarContent } from '@material-ui/core';

export class Notification extends Component {
  //this CMP will get the notification msg from props
  //will be rendered inside each component which can cause any notification

  state = {
    open: true,
    vertical: 'top',
    horizontal: 'right',
    width:'20%',
    style:{
      backgroundColor: '#c0c0c0',
      marginTop: '0px',
      padding:'15px',
      marginRight:'-24px',
      borderTopLeftRadius:'50px',
      borderBottomLeftRadius:'50px'


      // color:'white'
    }
  };

  componentDidMount() {
    this.updateOpenState();
  }

  componentDidUpdate(prevProps) {
    //if the prevprops open property is different from the current state's open property, update it
  }

  updateOpenState() {
    this.setState({ ...this.state, open: this.props.open });
  }

  handleClick = newState => {
    this.setState({ open: true, ...newState });
  };

  handleClose = () => {
    // this.setState({ ...this.state, open: false });
  };

  render() {
    const { vertical, horizontal, open } = this.state;
    return (
      <div>
        <Snackbar  anchorOrigin={{ vertical, horizontal }} key={`${vertical},${horizontal}`} open={open} onClose={this.handleClose}  >
          <SnackbarContent style={this.state.style} message={this.props.msg}>
            
          </SnackbarContent>
        </Snackbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
