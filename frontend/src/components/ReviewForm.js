import React, { Component } from 'react';
import { connect } from 'react-redux';

export class ReviewForm extends Component {
  render() {
    return <div>ReviewForm</div>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm);
