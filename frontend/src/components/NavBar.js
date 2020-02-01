import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

export class NavBar extends Component {
  /* Add state for filtering */

  render() {
    return (
      <nav className='main-nav flex-basis-30 '>
        <ul className='nav-bar clean-list flex-basis-1 flex'>
          <li>
            <NavLink activeClassName='active' to='/meal/cuisine' exact>
              cuisines
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName='active' to='/meal/location' exact>
              locations
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
