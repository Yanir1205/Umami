import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { logout, login } from '../actions/UserActions';


export class Header extends Component {

  onLogout = (ev) => {
    ev.preventDefault()
    this.props.logout();
    this.props.history.push(`/`);
  };

  onLogIn = async user => {

    await this.props.login(user);
  };

  render() {
    return (
      <div className='main-header-container flex align-center space-between'>
        <div className='container logo flex-basis-60 '>
          <Link to='/'>
            <span>umami</span>
          </Link>
        </div>
        <div className='nav-container container flex-basis-30 flex justify-end'>
          <div className='controls flex-basis-1 flex row align-center justify-center'>
            <div className='margin-right-10'>
              <Link to='/meal/edit'>
                <span className='ellipse-link'>Become a Host</span>
              </Link>
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
                </div>
              </>
            )}
            {!this.props.loggedInUser && (
              <>
                <Link className=' ' to={'/user/log-in'} onLogIn={this.onLogIn}>log-in</Link>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.user.loggedInUser,
});

const mapDispatchToProps = {
  logout,
  login,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));