import React, { Component } from 'react';
import { connect } from 'react-redux';

export class UserList extends Component {
  render() {
    return <div>User List</div>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
