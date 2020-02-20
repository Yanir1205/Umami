import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Notification from './Notification';
import { login } from '../actions/UserActions';

import { logout } from '../actions/UserActions';
import SocketService from '../services/SocketService';
import { addMsg } from '../actions/SocketAction';
import NotificationMsg from './NotificationMsg';

const GUEST_EMAIL = 'guest@gmail.com'
const GUEST_PASSWORD = 'guest'
const GUEST_ID = '5e4810c4793b07597058e829';

export class Header extends Component {
  state = {
    showNotification: false,
    registeredUser: {},
  };

  componentDidMount() {
    
    if (this.props.loggedInUser) {
      
      this.signToSocketEvent(this.props.loggedInUser._id);
    }
    else {
      
      this.loginAsGuest();
      this.signToSocketEvent(GUEST_ID);
    }
  }

  loginAsGuest() {
    this.props.login({email: GUEST_EMAIL, password: GUEST_PASSWORD})
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loggedInUser !== this.props.loggedInUser && this.props.loggedInUser) {
      this.signToSocketEvent(this.props.loggedInUser._id);
    }
  }

  componentWillUnmount() {
    
    this.unSignToSocketEvent();
  }

  signToSocketEvent = userId => {
    SocketService.setup();
    SocketService.emit('newChannel', `onEventRegistration${userId}`);
    SocketService.on('addMsg', this.addMsg);
  };

  addMsg = newMsg => {
    console.log('Header -> ', newMsg);

    this.setState({ showNotification: true, registeredUser: newMsg.loggedInUser });
    setTimeout(this.resetNotification, 8000);
  };

  resetNotification = () => {
    this.setState({ showNotification: false, registeredUser: '' });
  };

  unSignToSocketEvent = () => {
    SocketService.off('addMsg', this.addMsg);
    SocketService.terminate();
  };

  onLogout = ev => {
    ev.preventDefault();
    this.props.logout();
    this.unSignToSocketEvent();
    this.props.history.push(`/`);
  };

  render() {
    return [
      this.state.showNotification && <Notification key={1} open={true} msg={<NotificationMsg user={this.state.registeredUser}></NotificationMsg>}></Notification>,
      <div key={2} className='main-header-container flex align-center space-between'>
        <div className='container logo flex-basis-60 '>
          <Link to='/'>
            <span>umami</span>
          </Link>
        </div>
        <div className='nav-container container flex-basis-30 flex justify-end'>
          <div className='controls flex-basis-1 flex row align-center justify-end'>
            <div className='margin-right-10'>
              {/* <Link to='/meal/edit'>
                <span className=''>Hosts Zone</span>
              </Link> */}
            </div>
            {this.props.loggedInUser && (
              <>
                <div className='logged-user-container'>
                  <Link className='' to={`/user/${this.props.loggedInUser._id}`}>
                    <img style={{ width: '60px', height: '60px' }} src='https://res.cloudinary.com/contentexs/image/upload/v1580171634/user-round.svg' alt='' />
                  </Link>
                </div>
                <span>|</span>
                <div>
                  <a href='' onClick={this.onLogout}>
                    logout
                  </a>
                  {/* <a>Sck: {this.props.msg} </a> */}
                </div>
              </>
            )}
            {!this.props.loggedInUser && (
              <>
                <Link className='' to={'/user/login'}>
                  login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>,
    ];
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.user.loggedInUser,
  msg: state.socket.msg,
});

const mapDispatchToProps = {
  logout,
  addMsg,
  login
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
