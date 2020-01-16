import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBar from './NavBar.js';
import { Link } from 'react-router-dom';

export class Header extends Component {
  render() {
    return (
      <div className='main-header-container'>
        <div className='header-container container flex align-center'>
          <div className='header-logo flex-basis-50 flex align-center'>
            <div className='header-img'></div>
            <Link to="/">
              <h1>
                EAT<span>2</span>
              </h1>
            </Link>
          </div>
          <NavBar></NavBar>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
