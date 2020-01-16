import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Menu extends Component {
  render() {
    return <div>Meal Menu</div>;
  }
}

const mapStateToProps = state => (
  {menu:state.meal.meal.menu}
);

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
