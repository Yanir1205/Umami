import React, { Component } from 'react';
import { connect } from 'react-redux';

export class MealList extends Component {
  render() {
    return <div>MealList</div>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MealList);
