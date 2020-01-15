import React, { Component } from 'react';
import { connect } from 'react-redux';

export class MealApp extends Component {
  render() {
    return <div>MEAL APP</div>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MealApp);
