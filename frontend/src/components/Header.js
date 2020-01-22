import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBar from './NavBar.js';
import { Link } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import UserService from '../services/UserService';
import { logout ,login} from '../actions/UserActions';


export class Header extends Component {
  state = {
    isLogIn:null,
    
  };

  onLogout = () => {
    console.log('Header logout');
    
    this.props.logout();
  }

  onLogIn = async (user) => {
    const isLogin =  await this.props.login(user)
   console.log('Header -> onlogIn -> ',isLogin);
   
  };
  // checkLogIn = () => {
  //   return UserService.checkConnection();
  // };
  render() {
    console.log('checkLogIn', this.state.isLogIn);
    return (
      <div className='main-header-container'>
        <div className='header-container  flex'>
          <div className='header-logo flex-basis-30 flex'>
            <div className='header-img'></div>
            <Link to='/'>
              <h1>umami</h1>
            </Link>
          </div>
          <NavBar></NavBar>
          <div className='header-controls flex-basis-30 flex align-center justify-end'>
            {this.props.loggedInUser && (
              <>
                <div className='margin-right-30'>
                  <Link className='' to={`/user/${JSON.parse(UserService.getUserLoggedIn())._id}`}>
                    <img style={{ width: '30px', height: '30px' }} src={require('../assets/img/layout/dish-cover.svg')} alt='' />
                  </Link>
                </div>
                <span>|</span>
                <div className=''>
                  <a href='' onClick={this.onLogout}>
                    Logout
                  </a>
                </div>
              </>
            )}
            {!this.props.loggedInUser && (
              <>
                <Login onLogIn={this.onLogIn}></Login> <span>|</span>
                <Signup></Signup>
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
  login
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
