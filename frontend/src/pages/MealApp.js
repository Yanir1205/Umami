import React, { Component } from 'react';
import { connect } from 'react-redux';

import { load, loadCuisines, loadCities, loadMealsByLocation, loadMealsByCuisine } from '../actions/MealActions';
import { setFilter } from '../actions/FilterActions';

import MealList from '../components/MealList';
import BadgeList from '../components/BadgeList';
import Spinner from '../components/Spinner';
import SearchBar from '../components/SearchBar';

export class MealApp extends Component {
  state = {
    selectedBadge: '',
    renderType: '',
    isLoading: true
  };

  async componentDidMount() {
    window.scrollTo(0,10)
    await this.resetFilterDefinitions();
    if (this.props.location.pathname.includes('results')) {
      this.setState({ renderType: 'results' });
      const { results } = this.props.match.params;
      await this.props.setFilter({ ...this.filter, tags: results });
      await this.loadMeals();
    } else {
      await this.loadMeals();
    }
  }

  async componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.location.pathname) !== JSON.stringify(this.props.location.pathname)) {
      await this.loadMeals();
    }
  }

  async componentWillUnmount() {
    await this.resetFilterDefinitions();
  }

  resetFilterDefinitions = async () => {
    await this.props.setFilter({
      userId: '',
      at: '',
      type: '',
      location: {
        city: '',
        country: '',
      },
      tags: '',
    });
  }

  getAvgRate = reviews => {
    return reviews.reduce((acc, currReview) => acc + parseInt(currReview.rate), 0) / reviews.length;
  };

  load = async () => {
    await this.props.load(this.props.filter)
  }

  loadMeals = async () => {
    if (this.props.location.pathname.includes('results')) {
      const { results } = this.props.match.params;
      await this.props.setFilter({ ...this.filter, tags: results });
      this.setState({ isLoading: true })
      await this.load();
      this.setState({ isLoading: false })
    } else {
      let badgeName = '';
      if (this.props.location.pathname.includes('location')) {
        badgeName = 'location';
      } else if (this.props.location.pathname.includes('cuisine')) {
        badgeName = 'cuisine';
      }
      this.setBadges(badgeName);
      this.setState({ renderType: badgeName });
      if (badgeName === 'location') {
        const { location } = this.props.match.params;
        if (!location) {
          //load meals grouped by location
          await this.props.loadMealsByLocation();
          this.setState({ isLoading: false })
        } else {
          //load meals from specific location
          await this.props.setFilter({ ...this.props.filter, location: { ...this.props.location, city: location } })
          this.setState({ isLoading: true })
          await this.load();
          this.setState({ isLoading: false })
        }
      } else {
        const { cuisine } = this.props.match.params;
        if (!cuisine) {
          //load meals grouped by cuisine
          this.props.loadMealsByCuisine();
          this.setState({ isLoading: false })
        } else {
          await this.props.setFilter({ ...this.props.filter, type: cuisine })
          //load meals from specific cuisine
          this.setState({ isLoading: true })
          await this.load();
          this.setState({ isLoading: false })
        }
      }
    }
  };

  setBadges = async badgeType => {
    if (badgeType === 'location' && !(this.props.cities.length > 0)) {
      await this.props.loadCities();
    } else if (badgeType === 'cuisine' && !(this.props.cuisines.length > 0)) {
      await this.props.loadCuisines();
    }
  };

  onLocationClick = async city => {
    await this.resetFilterDefinitions();
    await this.props.setFilter({ ...this.props.filter, location: { ...this.props.filter.location, city } });
    this.props.history.push(`/meal/location/${city}`);
    await this.loadMeals();
  };

  onCuisineClick = async cuisine => {
    await this.resetFilterDefinitions();
    await this.props.setFilter({ ...this.props.filter, type: cuisine });
    this.props.history.push(`/meal/cuisine/${cuisine}`);
    await this.loadMeals();
  };

  onCardClick = id => {
    this.props.history.push(`/meal/${id}`);
  };
  
  render() {
    const isResultsUrl = this.props.location.pathname.includes('results');
    return (
      <div className='container'>
        <SearchBar></SearchBar>
        
        {this.state.isLoading && ((!this.props.cities && this.state.renderType === 'location' && !isResultsUrl) || (!this.props.cuisines && this.state.renderType === 'cuisine' && !isResultsUrl)) && <div className='spinner-container'>
            <Spinner type='spin'></Spinner>
          </div>}
        {this.props.cuisines && this.state.renderType === 'cuisine' && !isResultsUrl && <BadgeList selectedBadge={this.state.selectedBadge} onBadgeClick={this.onCuisineClick} badges={this.props.cuisines}></BadgeList>}
        {this.props.cities && this.state.renderType === 'location' && !isResultsUrl && <BadgeList selectedBadge={this.state.selectedBadge} onBadgeClick={this.onLocationClick} badges={this.props.cities}></BadgeList>}
        {this.props.meals.length > 0 && this.state.renderType && !this.state.isLoading && <MealList onCardClick={this.onCardClick} onCuisineClick={this.onCuisineClick} onLocationClick={this.onLocationClick} renderType={this.state.renderType} meals={this.props.meals} getAvgRate={this.getAvgRate}></MealList>}
        {!this.state.isLoading && this.props.meals.length === 0 && isResultsUrl && <div>Your search has no results</div>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  meals: state.meal.meals,
  filter: state.filter.filter,
  cities: state.meal.cities,
  cuisines: state.meal.cuisines,
});

const mapDispatchToProps = {
  load,
  setFilter,
  loadCuisines,
  loadCities,
  loadMealsByLocation,
  loadMealsByCuisine,
};

export default connect(mapStateToProps, mapDispatchToProps)(MealApp);
