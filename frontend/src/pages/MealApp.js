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

    async componentDidMount() {
        await this.loadMeals()
    }

    async componentDidUpdate(prevProps) {
        if (JSON.stringify(prevProps.location.pathname) !== JSON.stringify(this.props.location.pathname)) {
            await this.loadMeals()
        }
    }

    resetFilterDefinitions = () => {
        this.props.setFilter({
            userId: '',
            at: '',
            type: '',
            location: {
                city: '',
                country: '',
            }
        })
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
        await this.setState({ renderType: badgeName });
        if (badgeName === 'location') {
            const { location } = this.props.match.params
            if (!location) { //load meals grouped by location
                await this.props.loadMealsByLocation();
            } else { //load meals from specific location
                // await this.props.setFilter({ ...this.props.filter, location: { ...this.props.location, city: location } })
                await this.props.load(this.props.filter);
            }
        } else {
            const { cuisine } = this.props.match.params
            if (!cuisine) { //load meals grouped by cuisine
                this.props.loadMealsByCuisine();
            } else { //load meals from specific cuisine
                // await this.props.setFilter({ ...this.props.filter, type: cuisine })
                await this.props.load(this.props.filter)
            }
        }
    }

    setBadges = async (badgeType) => {
        if (badgeType === 'location' && !(this.props.cities.length > 0)) {
            await this.props.loadCities()
        } else if (badgeType === 'cuisine' && !(this.props.cuisines.length > 0)) {
            await this.props.loadCuisines()
        }
    }

    onLocationClick = async (event) => {
        const city = event.target.innerText
        await this.resetFilterDefinitions()
        await this.props.setFilter({ ...this.props.filter, location: { ...this.props.filter.location, city } })
        this.props.history.push(`/meal/location/${city}`);
        await this.loadMeals()
    }

    onCuisineClick = async (event) => {
        const cuisine = event.target.innerText;
        await this.resetFilterDefinitions()
        await this.props.setFilter({ ...this.props.filter, type: cuisine })
        this.props.history.push(`/meal/cuisine/${cuisine}`)
        await this.loadMeals()
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
