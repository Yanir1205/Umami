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
      {this.props.meals.length && <div>{this.props.meals[0].title}</div>}
    </div>;
  }
}

const mapStateToProps = state => ({
  meals: state.meal.meals
});

const mapDispatchToProps = {
  load,
};

export default connect(mapStateToProps, mapDispatchToProps)(MealApp);
