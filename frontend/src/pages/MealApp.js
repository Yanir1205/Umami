import React, { Component } from 'react';
import { connect } from 'react-redux';

import { load } from '../actions/MealActions';
import { setFilter } from '../actions/FilterActions';

import MealList from '../components/MealList';

export class MealApp extends Component {
  state = {
    renderType: '',
    cuisineTypes: '',
    locations: '',
  };

  componentDidMount() {
    const renderType = this.getRenderType();
    this.setState({ renderType: renderType }, this.loadMeals);
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.location.pathname) !== JSON.stringify(this.props.location.pathname)) {
      const renderType = this.getRenderType();
      this.setState({ renderType: renderType }, this.loadMeals);
    }
  }

  getRenderType() {
    return this.props.history.location.pathname === '/meal/cuisine' ? 'cuisine' : this.props.history.location.pathname === '/meal/location' ? 'location' : 'meal';
  }

  getAvgRate(reviews) {
    return reviews.reduce((acc, currReview) => acc + currReview.rate, 0) / reviews.length;
  }

  loadMeals = async () => {
    //if the renderType is meal - get all the meals according to the current filter (could be none or by location or by cuisine specific names)
    //if the renderType is cuisine - use mealService to get access to the DB where a map reduce function will get all the unique cuisine types
    //if the renderType is location - use mealService to get from the DB all the unique locations using map reduce

    if (this.state.renderType === 'meal') {
      await this.props.load(this.props.filter);
    } else if (this.state.renderType === 'cuisine') {
      await this.props.load();
      const cuisineTypes = this.props.meals.reduce((acc, meal) => {
        return acc.includes(meal.cuisineType) ? acc : [...acc, meal.cuisineType];
      }, []);
      this.setState({ cuisineTypes: cuisineTypes, locations: '' });
    } else if (this.state.renderType === 'location') {
      await this.props.load();
      const locations = this.props.meals.reduce((acc, meal) => {
        return acc.includes(meal.location.city) ? acc : [...acc, meal.location.city];
      }, []);
      this.setState({ locations: locations, cuisineTypes: '' });
    }
  };

  onLocationClick = async cityName => {
    await this.setState({ renderType: 'meal' }, this.props.history.push('/meal'));
    await this.props.setFilter({ ...this.props.filter, location: { ...this.props.filter.location, city: cityName } });
    this.loadMeals();
  };

  onCuisineClick = async cuisine => {
    await this.setState({ renderType: 'meal' });
    this.props.history.push('/meal');
    await this.props.setFilter({ ...this.props.filter, type: cuisine });
    this.loadMeals();
  };

  render() {
    return (
      <div className='container'>
        {!this.props.meals.length && <div>LOADING...</div>}
        {this.props.meals.length && <MealList onCuisineClick={this.onCuisineClick} onLocationClick={this.onLocationClick} renderType={this.state.renderType} meals={this.props.meals} cuisineTypes={this.state.cuisineTypes} locations={this.state.locations} getAvgRate={this.getAvgRate}></MealList>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  meals: state.meal.meals,
  filter: state.filter.filter,
});

const mapDispatchToProps = {
  load,
  setFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(MealApp);
