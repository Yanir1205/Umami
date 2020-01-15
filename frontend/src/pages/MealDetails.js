import React, { Component } from 'react';
import { connect } from 'react-redux';

export class MealDetails extends Component {
  render() {
    return <div>MEAL DETAILS</div>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MealDetails);
