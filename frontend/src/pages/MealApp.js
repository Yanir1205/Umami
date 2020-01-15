import React, { Component } from 'react';
import { connect } from 'react-redux';

import { load } from '../actions/MealActions'

export class MealApp extends Component {
  
  componentDidMount() {
    this.props.load()
    console.log(this.props.meals);
  }

  render() {
    return <div>
      MEAL APP
      
      </div>;
  }
}

const mapStateToProps = state => ({
  meal: state.meal.meals
});

const mapDispatchToProps = {
  load,
};

export default connect(mapStateToProps, mapDispatchToProps)(MealApp);
