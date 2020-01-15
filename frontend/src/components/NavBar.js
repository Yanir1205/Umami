import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

export class NavBar extends Component {
  /* Add state for filtering */

  render() {
    return (
      <nav className='main-nav flex-basis-50'>
        <ul className='main-menu clean-list flex-basis-1 flex justify-center'>
          <li>
            <NavLink activeClassName='active' to='/meal' exact>
              CUISINES
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName='active' to='/meal' exact>
              LOCATIONS
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
