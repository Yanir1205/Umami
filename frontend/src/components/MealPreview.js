import React, { Component } from 'react';
import { connect } from 'react-redux';

export class MealPreview extends Component {
  render() {
    return <div>MealPreview</div>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MealPreview);
