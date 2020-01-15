import React, { Component } from 'react';
import { connect } from 'react-redux';

export class ImageGallery extends Component {
  render() {
    return <div>Image gallery</div>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ImageGallery);
