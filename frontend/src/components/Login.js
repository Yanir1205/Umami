import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Login extends Component {
  render() {
    return <div>Login</div>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
