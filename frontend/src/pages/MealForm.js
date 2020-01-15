import React, { Component } from 'react';
import { connect } from 'react-redux';

export class MealForm extends Component {
  render() {
    return <div>Meal Form</div>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MealForm);
