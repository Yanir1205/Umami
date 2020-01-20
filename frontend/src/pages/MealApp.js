import React, { Component } from 'react';
import { connect } from 'react-redux';

import { load } from '../actions/MealActions';
import { setFilter } from '../actions/FlterActions';

import MealList from '../components/MealList';

export class MealApp extends Component {

  //this component should get the unique cuisine types from the DB
  //also get the unique locations from the DB. pass it to the MealList CMP along with the render type (according to the url)
  //when user clicks a location/cuisine type, this CMP shall change the render type to meal and pass the meals of the clicked location/cuisine

  state = {
    renderType: 'meal'
  }

  componentDidMount() {
    const renderType = this.props.history.location.pathname === '/meal/cuisine' ? 'cuisine' : this.props.history.location.pathname === '/meal/location' ? 'location' : 'meal';
    this.setState({ renderType: renderType }, this.loadMeals)
    // this.props.load();
    console.log(this.props.meals);
  }

  componentDidUpdate(prevState) {
    debugger
    if (!JSON.stringify(prevState.location.pathname).includes(this.state.renderType)) {
      const renderType = this.props.location.pathname === '/meal/cuisine' ? 'cuisine' : this.props.location.pathname === '/meal/location' ? 'location' : 'meal';
      this.setState({ renderType: renderType }, this.loadMeals)
    }
  }

  getAvgRate(reviews) {
    return reviews.reduce((acc, currReview) => acc + currReview.rate, 0) / reviews.length;
  }

  loadMeals = () => {
    debugger
    //this function should do the following:

    //if the renderType is meal - get all the meals according to the current filter (could be none or by location or by cuisine specific names)
    //if the renderType is cuisine - use mealService to get access to the DB where a map reduce function will get all the unique cuisine types
    //if the renderType is location - use mealService to get from the DB all the unique locations using map reduce

    this.props.load(this.props.filter);
  }

  onLocationClick = async (cityName) => {
    //use the mealService to get all the mills of the given location
    console.log(cityName);
    await this.props.setFilter({ ...this.props.filter, location: { ...this.props.filter.location, city: cityName } })
    this.loadMeals()
    this.setState({ renderType: 'meal' });
  }

  onCuisineClick = async (cuisine) => {
    //use the mealService to get all the mills of the given cuisine
    console.log(cuisine);
    await this.props.setFilter({ ...this.props.filter, type: cuisine })
    this.loadMeals()
    this.setState({ renderType: 'meal' });
  }

  render() {
    return <div className='container'>
      {!this.props.meals.length && <div>LOADING...</div>}
      {this.props.meals.length && <MealList onCuisineClick={this.onCuisineClick} onLocationClick={this.onLocationClick} renderType={this.state.renderType} meals={this.props.meals} getAvgRate={this.getAvgRate}></MealList>}
    </div>;
  }
}

const mapStateToProps = state => ({
  meals: state.meal.meals,
  filter: state.filter.filter
});

const mapDispatchToProps = {
  load,
  setFilter
};

export default connect(mapStateToProps, mapDispatchToProps)(MealApp);


/*

filter: {
        userId: '',
        at: Date.now(),
        type: '',
        location: {
            city: '',
            country: '',
        }
    }

*/