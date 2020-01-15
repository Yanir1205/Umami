import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Reservation extends Component {
  render() {
    return <div>Reservation</div>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Reservation);
