import React, { Component } from 'react';
import { connect } from 'react-redux';

export class ReviewPreview extends Component {
  render() {
    return <div>Review Preview</div>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewPreview);
