import React, { Component } from 'react';
import { connect } from 'react-redux';

export class UserDetails extends Component {
  render() {
    return <div>UserDetails</div>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
