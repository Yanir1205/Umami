import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBar from './NavBar.js';
import { Link } from 'react-router-dom';

export class Header extends Component {
  onLogout = () => {};

  render() {
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
              <Link className='' to='/user/1539'>
                <img style={{ width: '30px', height: '30px' }} src={require('../assets/img/layout/dish-cover.svg')} alt='' />
              </Link>
            </div>
            <div className=''>
              <a href='' onClick={this.onLogout}>
                Logout
              </a>
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
