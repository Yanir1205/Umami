import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBar from './NavBar.js';
import { Link } from 'react-router-dom';
import Login from './Login'
import Signup from './Signup'
import UserService from '../services/UserService'

export class Header extends Component {

  state = {
    isLogIn: UserService.checkConnection()
  }
  componentDidUpdate() {
    console.log('Hii !!!');

    // this.setState({ isLogIn: UserService.checkConnection() })

  }

  handleClick = () => {
    this.setState(prevState => ({ isLogIn: !prevState.isLogIn }))

  }
  onLogout = () => {
    UserService.logout()
    this.setState(prevState => ({ isLogIn: !prevState.isLogIn }))
  };
  onLogIn = () => {
    this.setState(prevState => ({ isLogIn: !prevState.isLogIn }))
  }
  checkLogIn = () => {
    return UserService.checkConnection()
  }
  render() {
    const user = UserService.checkConnection()
    console.log("checkLogIn", user);
    
    return (
      <div className='main-header-container'>
        <div className='header-container  flex'>
          <div className='header-logo flex-basis-30 flex'>
            <div className='header-img'></div>
            <Link to='/'>
              <h1>
                EAT<span>2</span>
              </h1>
            </Link>
          </div>
          <NavBar></NavBar>
          <div className='header-controls flex-basis-30 flex align-center justify-end'>
            <div className='margin-right-30'>
            {this.state.isLogIn && <Link className='' to={`/user/${JSON.parse(UserService.getUserLoggedin())._id}`}>
                <img style={{ width: '30px', height: '30px' }} src={require('../assets/img/layout/dish-cover.svg')} alt='' />
              </Link>}
            </div>
            <div className=''>

              {this.state.isLogIn && <a href='' onClick={this.onLogout}>
                Log out
              </a>}

              {!this.state.isLogIn && <Login onLogIn={this.onLogIn}></Login>}
              {!this.state.isLogIn && <Signup></Signup>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
