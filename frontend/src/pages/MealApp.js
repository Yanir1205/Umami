import React, { Component } from 'react';
import { connect } from 'react-redux';

import { load } from '../actions/MealActions'

import MealList from '../components/MealList'

export class MealApp extends Component {

  componentDidMount() {
    this.props.load()
    console.log(this.props.meals);
  }

  getCityName = (address, title) => {
    const diningType = title.toLowerCase().includes('dinner') ? 'dinner' : title.toLowerCase().includes('breakfast') ? 'breakfast' : 'lunch';
    const city = address.split(' ').slice(2, -1).join(' ');
    return `${diningType} in ${city}`;
  }

  getAvgRate(reviews) {
    return reviews.reduce((acc, currReview) => acc + currReview.rate, 0) / reviews.length
  }

  render() {
    return <div>
      {this.props.meals.length && <MealList meals={this.props.meals} getCityName={this.getCityName} getAvgRate={this.getAvgRate}></MealList>}
    </div>
  }
}

const mapStateToProps = state => ({
  meals: state.meal.meals
});

const mapDispatchToProps = {
  load,
};

export default connect(mapStateToProps, mapDispatchToProps)(MealApp);
