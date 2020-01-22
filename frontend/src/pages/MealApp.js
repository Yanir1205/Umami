import React, { Component } from 'react';
import { connect } from 'react-redux';

import { load, loadCuisines, loadCities, loadMealsByLocation, loadMealsByCuisine } from '../actions/MealActions';
import { setFilter } from '../actions/FilterActions';

import MealList from '../components/MealList';
import BadgeList from '../components/BadgeList';

export class MealApp extends Component {

    state = {
        selectedBadge: '',
        renderType: ''
    }

    componentDidMount() {
        this.loadMeals()
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(prevProps.location.pathname) !== JSON.stringify(this.props.location.pathname)) {
            this.loadMeals()
        }
    }

    getAvgRate = (reviews) => {
        return reviews.reduce((acc, currReview) => acc + currReview.rate, 0) / reviews.length;
    }

    loadMeals = async () => {
        let badgeName = '';
        if (this.props.location.pathname.includes('location')) {
            badgeName = 'location';
        } else if (this.props.location.pathname.includes('cuisine')) {
            badgeName = 'cuisine';
        }
        this.setBadges(badgeName);
        this.setState({ renderType: badgeName });
        if (badgeName === 'location') {
            const { location } = this.props.match.params
            if (!location) {
                this.props.loadMealsByLocation();
            } else {
                await this.props.setFilter({ ...this.props.filter, location: { city: location } })
                this.props.load(this.props.filter);
            }
        } else {
            const { cuisine } = this.props.match.params
            if (!cuisine) {
                this.props.loadMealsByCuisine();
            } else {
                await this.props.setFilter({ ...this.props.filter, type: cuisine })
                this.props.load(this.props.filter)
            }
        }
    }

    setBadges = (badgeType) => {
        if (badgeType === 'location') {
            this.props.loadCities()
        } else if (badgeType === 'cuisine') {
            this.props.loadCuisines()
        }
    }


    onLocationClick = async (event) => {
        const city = event.target.innerText
        await this.props.setFilter({ ...this.props.filter, location: { ...this.props.filter.location, city } })
        this.props.history.push(`/meal/location/${city}`);
        this.loadMeals()
    }

    onCuisineClick = async (event) => {
        const cuisine = event.target.innerText;
        await this.props.setFilter({ ...this.props.filter, type: cuisine })
        this.props.history.push(`/meal/cuisine/${cuisine}`)
        this.loadMeals()
    }

    onCardClick = (id) => {
        this.props.history.push(`/meal/${id}`)
    }

    render() {
        return <div className='container'>
            {!this.props.meals.length && <div>LOADING...</div>}
            {this.props.cuisines && this.state.renderType === 'cuisine' && <BadgeList selectedBadge={this.state.selectedBadge} onBadgeClick={this.onCuisineClick} badges={this.props.cuisines}></BadgeList>}
            {this.props.cities && this.state.renderType === 'location' && <BadgeList selectedBadge={this.state.selectedBadge} onBadgeClick={this.onLocationClick} badges={this.props.cities}></BadgeList>}

            {this.props.meals.length && this.state.renderType && <MealList onCardClick={this.onCardClick} onCuisineClick={this.onCuisineClick} onLocationClick={this.onLocationClick} renderType={this.state.renderType} meals={this.props.meals} getAvgRate={this.getAvgRate}></MealList>}
        </div>;
    }
}

const mapStateToProps = state => ({
    meals: state.meal.meals,
    filter: state.filter.filter,
    cities: state.meal.cities,
    cuisines: state.meal.cuisines
});

const mapDispatchToProps = {
    load,
    setFilter,
    loadCuisines,
    loadCities,
    loadMealsByLocation,
    loadMealsByCuisine
};

export default connect(mapStateToProps, mapDispatchToProps)(MealApp);
