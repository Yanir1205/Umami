import React, { Component } from 'react';
import { connect } from 'react-redux';

export class ReviewList extends Component {
  render() {
    return <div>ReviewList</div>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewList);
